import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

const preloadedState = {}
const middlewares = [thunkMiddleware]
const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewares))

const store = createStore(rootReducer, preloadedState, composedEnhancer)
export default store