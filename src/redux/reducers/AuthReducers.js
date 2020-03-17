import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOADING,
    SIGNUP_USER_SUCCESS,
    NAME_CHANGED,
    NUMBER_CHANGED,
    LOGIN_USER_FAIL
} from '../actions/types'
const INITIAL_STATE = {
    email: '',
    pass: '',
    user: null,
    isLoading: false,
    name: '',
    number: ''
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
        default:
            return state
    }

}