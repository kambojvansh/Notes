import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS } from "./types"
import firebase from 'react-native-firebase'

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

export const logInUser = (email, password) => {
    return (dispatch) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                dispatch({ type: LOGIN_USER_SUCCESS, payload: user })
            })
            .catch(error => {
            })

    }


}