import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import { thunk } from 'redux-thunk'
import postsReducer from './reducers/postsReducer'
import commentsReducer from './reducers/commentsReducer'

const rootReducer = combineReducers({
  posts: postsReducer,
  comments: commentsReducer,
})

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store
