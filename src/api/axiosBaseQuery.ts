import { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios, { isAxiosError, AxiosRequestConfig } from 'axios'

type QueryProps = {
  url: string
  method: string
  data?: string
  params?: Record<string, unknown>
}

export const axiosBaseQuery = (baseUrl: string): BaseQueryFn => {
  return async ({ url, method, data, params }: QueryProps) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
      } as AxiosRequestConfig)

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
