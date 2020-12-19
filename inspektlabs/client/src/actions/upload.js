import { IMGURI, UPLOAD_ERROR, LOAD_IMAGE, ERR_LOAD_IMG } from './types'
import axios from 'axios'

// upload image
export const uploadImage = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    try {
        const res = await axios.post('/upload', data, config)
        dispatch({
            type: IMGURI,
            payload: res.data
        })
    }
    catch {
        dispatch({
            type: UPLOAD_ERROR
        })
    }
}

export const loadImage = () => async dispatch => {
    try {
        const res = await axios.get('/loadimage')
        dispatch({
            type: LOAD_IMAGE,
            payload: res.data
        })
    }
    catch {
        dispatch({
            type: ERR_LOAD_IMG
        })
    }
}