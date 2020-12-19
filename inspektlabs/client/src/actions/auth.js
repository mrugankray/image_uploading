import { REGISTER_FAIL, REGISTER_SUCCESS, TOKEN_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_ERROR,LOGOUT } from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import { loadImage } from './upload'

// Load User
export const loadToken = () => async dispatch => {
    const token = localStorage.getItem('token')
    if(token) {
        setAuthToken(token)
        dispatch({
            type: TOKEN_LOADED,
            payload: token
        })
    }
    else {
        dispatch({
            type: AUTH_ERROR,
        })
    }

}

//Login
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    }

    const body = {
        email,
        password
    }

    try {
        const res = await axios.post('/login', body, config)
        // console.log(res)
        // res.data.token = res.data.msg

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadToken())
        dispatch(loadImage())
    }
    catch(err) {
        const errors = err.response.data.error
        console.log(errors)

        if(errors) {
            errors.forEach((error) => {
                // dispatch(setAlert(error.msg, 'danger'))
            })
        }

        dispatch({
            type: LOGIN_ERROR
        })
    }
}

// Register
export const register = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    } 

    const body = {
        email,
        password
    }

    try {
        const res = await axios.post('/register', body, config)
        console.log(res)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        dispatch(loadToken())
    }
    catch(err) {
        const errors = err.response.data.errors
        // console.log(errors)

        if (errors) {
            errors.forEach(error => {
                // dispatch(setAlert(error.msg, 'danger'))
            });
        }

        dispatch({
            type: REGISTER_FAIL
        })
    }
    
}

//LOGOUT
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}