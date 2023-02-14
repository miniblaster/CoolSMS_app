import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { userApi } from 'src/services/api/users'

// ** Fetch Users
export const fetchData = createAsyncThunk('appUsers/fetchData', async params => {
  const response = await userApi.getAll(params)

  return response.data
})

// ** Add User
export const addUser = createAsyncThunk('appUsers/addUser', async (data, { getState, dispatch }) => {
  const response = await userApi.create(data)
  dispatch(fetchData(getState().user.params))

  return response.data
})

// ** Update User
export const updateUser = createAsyncThunk('appUsers/updateUser', async (data, { getState, dispatch }) => {
  const response = await userApi.update(data.id, data)
  dispatch(fetchData(getState().user.params))

  return response.data
})

// ** Delete User
export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { getState, dispatch }) => {
  const response = await userApi.delete(id)
  dispatch(fetchData(getState().user.params))

  return response.data
})

// ** Get Current User
export const getCurrentUser = createAsyncThunk('appUsers/getUser', async id => {
  const response = await userApi.getById(id)

  return response.data.data
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    currentUser: null,
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {
    handleSelectUser: (state, action) => {
      state.currentUser = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.data?.items || []
      state.total = action.payload.data?.meta.totalItems
      state.params = action.payload.params
      state.allData = action.payload.data?.items || []
    })
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
  }
})

export default appUsersSlice.reducer
