import { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios, { isAxiosError } from 'axios'

type QueryProps = {
  url: string
  method: string
  data?: string
}

export const axiosBaseQuery = (baseUrl: string): BaseQueryFn => {
  return async ({ url, method, data }: QueryProps) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
      })

      return { data: result.data, error: undefined }
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          data: undefined,
          error: {
            status: error.response?.status,
            data: error.response?.data || error.message,
          },
        }
      }

      return {
        data: undefined,
        error: {
          status: 500,
          data: 'Unknown error happened',
        },
      }
    }
  }
}
