import { combineReducers } from 'redux'
import auth from './auth'
import upload from './upload'

export default combineReducers({
    auth,
    upload
})