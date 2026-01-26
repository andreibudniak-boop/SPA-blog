const POSTS_LOADING = 'POSTS_LOADING'
const POSTS_SUCCESS = 'POSTS_SUCCESS'
const POSTS_ERROR = 'POSTS_ERROR'
const ADD_POST = 'ADD_POST'
const POST_LOADING = 'POST_LOADING'
const POST_SUCCESS = 'POST_SUCCESS'
const POST_ERROR = 'POST_ERROR'

const initialState = {
  posts: [],
  post: null,
  loading: false,
  loadingPost: false,
  error: null,
}

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_LOADING:
      return {
        ...state,
        loading: true,
        loadingPost: false,
        error: null,
      }

    case POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: null,
      }

    case POSTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      }

    case POST_LOADING:
      return {
        ...state,
        loading: false,
        loadingPost: true,
        error: null,
      }
    case POST_SUCCESS:
      return {
        ...state,
        loadingPost: false,
        post: action.payload,
        error: null,
      }
    case POST_ERROR:
      return {
        ...state,
        loadingPost: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default postsReducer
