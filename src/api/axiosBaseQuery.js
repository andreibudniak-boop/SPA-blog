import axios from 'axios'

export const axiosBaseQuery =
  ({ baseUrl } = {}) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
      })
      return { data: result.data }
    } catch (error) {
      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
        },
      }
    }
  }
