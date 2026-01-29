import { configureStore } from '@reduxjs/toolkit'
import { blogApi } from '../api/blogApi'

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(blogApi.middleware),
  devTools: import.meta.env.MODE !== 'production',
})

export default store
