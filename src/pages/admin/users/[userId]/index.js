/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'
import toast from 'react-hot-toast'

import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

// ** Third Party Imports
import * as yup from 'yup'
import { Button, TextField } from '@mui/material'
import { getCurrentUser } from 'src/store/apps/user'
import { useFormik } from 'formik'

// ** Actions Imports
import { updateUser } from 'src/store/apps/user'
import { USER_ROLE } from 'src/configs/constants'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const UserEditPage = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.user)
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: currentUser?.email || '',
      nickName: currentUser?.nickName || '',
      role: currentUser?.role || ''
    },
    validationSchema: yup.object({
      email: yup.string().email().required(),
      nickName: yup
        .string()
        .min(6, obj => showErrors('Username', obj.value.length, obj.min))
        .required(),
      role: yup.string().required()
    }),
    onSubmit: async (values, helpers) => {
      try {
        const payload = {
          nickName: values.nickName,
          email: values.email,
          id: currentUser.id,
          role: values.role
        }

        await onSubmit(payload)
        helpers.setStatus({ success: true })
        helpers.setSubmitting(false)
        toast.success(`User update success!`)
      } catch (err) {
        console.error(err)
        helpers.setStatus({ success: false })
        helpers.setErrors({ submit: err.message })
        toast.error(sentenceCase(err.message))
        helpers.setSubmitting(false)
      }
    }
  })

  useEffect(() => {
    formik.setValues(values => ({ ...values, ...currentUser }))
  }, [dispatch, currentUser])

  useEffect(() => {
    const userId = window.location.pathname.split('/')[3]
    dispatch(getCurrentUser(userId))
  }, [dispatch])

  const onSubmit = async payload => {
    dispatch(updateUser(payload)).then(() => router.replace('/admin/users'))
  }

  const handleCancel = () => {
    router.replace('/admin/users')
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Update' />
          <CardContent>
            <Box sx={{ p: 5 }}>
              <form onSubmit={formik.handleSubmit}>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <TextField
                    error={Boolean(formik.touched.nickName && formik.errors.nickName)}
                    fullWidth
                    helperText={formik.touched.nickName && formik.errors.nickName}
                    label='User Name'
                    name='nickName'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    value={formik.values.nickName}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <TextField
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label='Email'
                    name='email'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    value={formik.values.email}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='role-select'>Select Role</InputLabel>
                  <Select
                    fullWidth
                    value={formik.values.role}
                    id='select-role'
                    label='Select Role'
                    labelId='role-select'
                    name='role'
                    onChange={formik.handleChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    {Object.keys(USER_ROLE).map((key, index) => (
                      <MenuItem value={key} key={index}>
                        {USER_ROLE[key].role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
                    Update
                  </Button>
                  <Button size='large' variant='outlined' color='secondary' onClick={handleCancel}>
                    Cancel
                  </Button>
                </Box>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserEditPage
