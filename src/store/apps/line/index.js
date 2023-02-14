import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { lineApi } from 'src/services/api/lines'

// ** Fetch Lines
export const fetchData = createAsyncThunk('appLines/fetchData', async params => {
  const response = await lineApi.getAll(params)

  return response.data
})

// ** Add Line
export const addLine = createAsyncThunk('appLines/addLine', async (data, { getState, dispatch }) => {
  const response = await lineApi.create(data)
  dispatch(fetchData(getState().line.params))

  return response.data
})

// ** Update Line
export const updateLine = createAsyncThunk('appLines/updateLine', async (data, { getState, dispatch }) => {
  const response = await lineApi.update(data.id, data)
  dispatch(fetchData(getState().line.params))

  return response.data
})

// ** Delete Line
export const deleteLine = createAsyncThunk('appLines/deleteLine', async (id, { getState, dispatch }) => {
  const response = await lineApi.delete(id)
  dispatch(fetchData(getState().line.params))

  return response.data
})

// ** Get Current Line
export const getCurrentLine = createAsyncThunk('appLines/getLine', async id => {
  const response = await lineApi.getById(id)

  return response.data.data
})

export const appLinesSlice = createSlice({
  name: 'appLines',
  initialState: {
    currentLine: null,
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {
    handleSelectLine: (state, action) => {
      state.currentLine = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.data.items
      state.total = action.payload.data.meta.totalItems
      state.params = action.payload.params
      state.allData = action.payload.data.items
    })
    builder.addCase(getCurrentLine.fulfilled, (state, action) => {
      state.currentLine = action.payload
    })
  }
})

export default appLinesSlice.reducer
