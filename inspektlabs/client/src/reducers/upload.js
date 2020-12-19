import { IMGURI, UPLOAD_ERROR, LOAD_IMAGE, ERR_LOAD_IMG, LOGOUT } from '../actions/types'

const initialState = {
    imguri: null
}

export default (state=initialState, actions) => {
    const {type, payload} = actions

    switch(type) {
        case LOAD_IMAGE:
        case IMGURI:
            return {
                ...state,
                imguri: payload.msg
            }
        case ERR_LOAD_IMG:
        case UPLOAD_ERROR:
            return {
                ...state,
                imguri: null
            }
        case LOGOUT:
            return {
                ...state,
                imguri: null
            }
        default:
            return state
    }
}