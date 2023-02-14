import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { userLinesApi } from 'src/services/api/user-lines'

// ** Fetch Lines
export const fetchData = createAsyncThunk('appUserLines/fetchData', async params => {
  const response = await userLinesApi.getAll(params)

  return response.data
})

// ** Add Line
export const addUserLines = createAsyncThunk('appUserLines/addUserLines', async (data, { getState, dispatch }) => {
  const response = await userLinesApi.create(data)

  dispatch(fetchData(getState().line.params))

  return response.data
})

// ** Update Line
export const updateUserLine = createAsyncThunk('appUserLines/updateUserLine', async (data, { getState, dispatch }) => {
  const response = await userLinesApi.update(data.id, data)
  dispatch(fetchData(getState().line.params))

  return response.data
})

// ** Delete Line
export const deleteUserLine = createAsyncThunk('appUserLines/deleteUserLine', async (id, { getState, dispatch }) => {
  const response = await userLinesApi.delete(id)
  dispatch(fetchData(getState().line.params))

  return response.data
})

// ** Get Current Line
export const getCurrentUserLine = createAsyncThunk('appUserLines/getUserLine', async id => {
  const response = await userLinesApi.getById(id)

  return response.data.data
})

export const appUserLinesSlice = createSlice({
  name: 'appUserLines',
  initialState: {
    currentUserLine: null,
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {
    handleSelectLine: (state, action) => {
      state.currentUserLine = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.data.items
      state.total = action.payload.data.meta.totalItems
      state.params = action.payload.params
      state.allData = action.payload.data.items
    })
    builder.addCase(getCurrentUserLine.fulfilled, (state, action) => {
      state.currentUserLine = action.payload
    })
  }
})

export default appUserLinesSlice.reducer
