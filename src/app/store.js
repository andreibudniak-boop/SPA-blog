import { configureStore } from '@reduxjs/toolkit'
import { blogApi } from '../api/blogApi'

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(blogApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
