import axios from 'axios'
const baseUrl = import.meta.env.VITE_API_BASE_URL

// Action creators (синхронные)
export const postsLoading = () => ({
  type: 'POSTS_LOADING',
})

export const postsSuccess = posts => ({
  type: 'POSTS_SUCCESS',
  payload: posts,
})

export const postsError = error => ({
  type: 'POSTS_ERROR',
  payload: error,
})

export const addPost = post => ({
  type: 'ADD_POST',
  payload: post,
})

export const postLoading = () => ({
  type: 'POST_LOADING',
})

export const postSuccess = post => ({
  type: 'POST_SUCCESS',
  payload: post,
})

export const postError = error => ({
  type: 'POST_ERROR',
  payload: error,
})

export const fetchPosts = () => {
  return async dispatch => {
    dispatch(postsLoading())

    try {
      const response = await axios.get(`${baseUrl}/posts`)
      dispatch(postsSuccess(response.data))
    } catch (error) {
      dispatch(postsError(error.message))
    }
  }
}

export const fetchPost = id => {
  return async dispatch => {
    dispatch(postLoading())

    try {
      const response = await axios.get(`${baseUrl}/posts/${id}`)
      dispatch(postSuccess(response.data))
    } catch (error) {
      dispatch(postError(error.message))
    }
  }
}

export const createPost = (postData, onSuccess, onError) => {
  return async dispatch => {
    try {
      const response = await axios.post(`${baseUrl}/posts`, postData)
      dispatch(addPost(response.data))
      if (onSuccess) {
        onSuccess(response.data)
      }
    } catch (error) {
      dispatch(postsError(error.message))
      if (onError) {
        onError(error.message)
      }
    }
  }
}
