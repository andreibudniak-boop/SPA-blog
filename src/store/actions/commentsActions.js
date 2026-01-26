import axios from 'axios'
const baseUrl = import.meta.env.VITE_API_BASE_URL

export const commentsLoading = () => ({
  type: 'COMMENTS_LOADING',
})

export const commentsSuccess = comments => ({
  type: 'COMMENTS_SUCCESS',
  payload: comments,
})

export const commentsError = error => ({
  type: 'COMMENTS_ERROR',
  payload: error,
})

export const fetchComments = id => {
  return async dispatch => {
    dispatch(commentsLoading())

    try {
      const response = await axios.get(`${baseUrl}/posts/${id}/comments`)
      dispatch(commentsSuccess(response.data))
    } catch (error) {
      dispatch(commentsError(error.message))
    }
  }
}
