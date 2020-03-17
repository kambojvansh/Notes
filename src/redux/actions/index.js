import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOADING,
    SIGNUP_USER_SUCCESS,
    NAME_CHANGED,
    NUMBER_CHANGED,
    LOGIN_USER_FAIL
} from "./types"
import firebase from 'react-native-firebase'
import { Actions } from 'react-native-router-flux'
import { loginSuccess } from "../actions/navigationScreens"

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
}
export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
}
export const nameChanged = (text) => {
    return {
        type: NAME_CHANGED,
        payload: text
    }
}
export const numberChanged = (text) => {
    return {
        type: NUMBER_CHANGED,
        payload: text
    }
}


export const logInUser = (email, password) => {
    return (dispatch) => {
        dispatch({ type: LOADING, payload: true })
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                dispatch({ type: LOGIN_USER_SUCCESS, payload: user })
                // dispatch({ type: 'success' })
                Actions.main()
            })
            .catch(error => {
                alert(error)
                dispatch({ type: LOGIN_USER_FAIL })
            })

    }


}
export const signUpUser = (email, password) => {
    return (dispatch) => {
        dispatch({ type: LOADING, payload: true })
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            // .then(() => this.props.navigation.navigate('Home'))
            .then((user) => {
                dispatch({ type: SIGNUP_USER_SUCCESS, payload: user })
                // alert("sucsess")

            })
            .catch(error => {
                alert(error)
                dispatch({ type: LOGIN_USER_FAIL })
            })

    }
}