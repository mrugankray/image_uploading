import { REGISTER_SUCCESS, REGISTER_FAIL, TOKEN_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    loading: true,
    isAuthenticated: false
}

export default (state=initialState, action) => {
    const { type, payload } = action

    switch(type) {
        case TOKEN_LOADED:
            return {
                ...state,
                token: payload,
                isAuthenticated: true,
                loading: false,
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.msg)
            return {
                ...state,
                token: payload.msg,
                isAuthenticated : true,
                loading: false
            }
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGIN_ERROR: 
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state
    }
}