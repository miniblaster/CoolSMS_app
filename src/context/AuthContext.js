// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Config
import authConfig from 'src/configs/auth'
import { authApi } from 'src/services/api/auth'

// ** Defaults
const defaultProvider = {
  email: null,
  uuid: null,
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  verifyEmail: () => Promise.resolve(),
  activate: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [email, setEmail] = useState(defaultProvider.email)
  const [uuid, setUuid] = useState(defaultProvider.email)
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = globalThis.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        authApi
          .me()
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data.data })
            setEmail(response.data.data.email)
            setUuid(response.data.data.id)
          })
          .catch(err => {
            globalThis.localStorage.removeItem(authConfig.storageUserDataKeyName)
            globalThis.localStorage.removeItem(authConfig.onTokenExpiration)
            globalThis.localStorage.removeItem(authConfig.storageTokenKeyName)
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'refreshToken' && !router.pathname.includes('login')) {
              router.replace('/auth/launch')
            }
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async params => {
    const { data, ok } = await authApi.login(params)
    if (!ok) {
      throw new Error(data.message)
    } else {
      if (params.rememberMe) {
        globalThis.localStorage.setItem(authConfig.storageTokenKeyName, data.data.token.accessToken)
        globalThis.localStorage.setItem(authConfig.onTokenExpiration, data.data.token.refreshToken)
      }
      const returnUrl = router.query.returnUrl
      setUser({ ...data.data })
      params.rememberMe
        ? globalThis.localStorage.setItem(authConfig.storageUserDataKeyName, JSON.stringify(data.data))
        : null
      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
      router.replace(redirectURL)
    }
  }

  const handleActivate = (params, errorCallback) => {
    authApi
      .activate(params)
      .then(async response => {
        router.replace('/')
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleVerifyEmail = async params => {
    const { data, ok } = await authApi.verify(params)
    if (!ok) {
      throw new Error(data.message)
    } else {
      switch (data?.data?.status) {
        case 'active': // active
          setEmail(data?.data?.email)
          setUuid(data?.data?.id)
          router.replace('/auth/login')
          break
        case 'pending': // pending
          setEmail(data?.data?.email)
          setUuid(data?.data?.id)
          router.replace('/auth/create-password')
          break
        default:
          throw new Error({ message: 'User not found' })
      }
    }
  }

  const handleLogout = () => {
    setUser(null)
    globalThis.localStorage.removeItem(authConfig.storageUserDataKeyName)
    globalThis.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/auth/launch')
  }

  const handleRegister = async params => {
    const { data, ok } = await authApi.register(params)
    if (!ok) {
      throw new Error(data.message)
    } else {
      if (data.error) {
        throw new Error(data.error)
      } else {
        handleLogin({ email: params.email, password: params.password })
      }
    }
  }

  const values = {
    email,
    uuid,
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    verifyEmail: handleVerifyEmail,
    activate: handleActivate
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
