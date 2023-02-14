import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { messagesApi } from 'src/services/api/messages'

// ** Fetch Messages
export const fetchData = createAsyncThunk('appMessages/fetchData', async params => {
  const response = await messagesApi.getAll(params)

  return response.data
})

// ** Get Current Line
export const getCurrentMessage = createAsyncThunk('appMessages/getMessage', async id => {
  const response = await messagesApi.getById(id)

  return response.data.data
})

export const appMessageSlice = createSlice({
  name: 'appMessages',
  initialState: {
    currentMessage: null,
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.data.items
      state.total = action.payload.data.meta.totalItems
      state.params = action.payload.params
      state.allData = action.payload.data.items
    })
    builder.addCase(getCurrentMessage.fulfilled, (state, action) => {
      state.currentMessage = action.payload
    })
  }
})

export default appMessageSlice.reducer
