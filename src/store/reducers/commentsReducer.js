const COMMENTS_LOADING = 'COMMENTS_LOADING'
const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS'
const COMMENTS_ERROR = 'COMMENTS_ERROR'

const initialState = {
  comments: [],
  loading: false,
  error: null,
}

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload,
        error: null,
      }

    case COMMENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default commentsReducer
