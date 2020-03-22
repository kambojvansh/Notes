import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOADING,
    SIGNUP_USER_SUCCESS,
    NAME_CHANGED,
    NUMBER_CHANGED,
    LOGIN_USER_FAIL,
    GETNOTES,
    MODELSHOW
} from '../actions/types'
const INITIAL_STATE = {
    email: '',
    pass: '',
    user: null,
    isLoading: false,
    name: '',
    number: '',
    userArr: null,
    count: 0,
    ModelVisible: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload }
        case PASSWORD_CHANGED:
            return { ...state, pass: action.payload }
        case NAME_CHANGED:
            return { ...state, name: action.payload }
        case NUMBER_CHANGED:
            return { ...state, number: action.payload }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLogin: true,
                isLoading: false,
                email: '',
                pass: '',
            }
        case SIGNUP_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
            }
        case LOGIN_USER_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case LOADING:
            return { ...state, isLoading: action.payload }
        case GETNOTES:
            return {
                ...state, userArr: action.payload
            }
        case 'count':
            return {
                ...state, count: action.payload
            }
        case MODELSHOW:
            return {
                ...state, ModelVisible: action.payload
            }
        default:
            return state
    }

}