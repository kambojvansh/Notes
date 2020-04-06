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
    MODELSHOW,
    TITLE_CHANGED,
    NOTE_CHANGE,
    COLOR_MODEL_SHOW,
    SELECT_TEXT_COLOR
} from "./types"
import firebase from 'react-native-firebase'
import { Actions } from 'react-native-router-flux'
import { loginSuccess } from "../actions/navigationScreens"
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'
// import { GoogleSignin } from 'react-native-google-signin'

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
export const signOut = () => {
    return (dispatch) => {
        dispatch({ type: LOADING, payload: true })
        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch({ type: LOADING, payload: false })
                // dispatch({ type: 'success' })
                Actions.auth()
            })
            .catch(error => {
                alert(error)
                dispatch({ type: LOGIN_USER_FAIL })
            })

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
                // Actions.main()

            })
            .catch(error => {
                alert(error)
                dispatch({ type: LOGIN_USER_FAIL })
            })

    }
}

export const getNotes = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
        const { Notes, isLikes, notesHeading, notesdate, image, textColor, NotComplete, Complete } = res.data();
        userArr.push({
            key: res.id,
            res,
            Notes,
            isLikes,
            notesHeading,
            notesdate,
            image,
            textColor,
            NotComplete,
            Complete
        })
        // console.log(userArr)
    })
    return {
        type: GETNOTES,
        payload: userArr
    }

}

export const countOfNotes = (userArr) => {
    return (dispatch) => {
        let key, count = 0
        for (key in userArr) {
            if (userArr.hasOwnProperty(key)) {
                count++
            }
        }
        dispatch({ type: 'count', payload: count })
    }
}
export const countOfNotesCompleted = (userArr) => {
    // console.log(userArr)
    return (dispatch) => {
        let date, completeNote = 0
        const result = userArr.filter(obj => obj.Complete === true);
        // console.log(result)
        for (date in result) {
            if (result.hasOwnProperty(date)) {
                completeNote++
                // alert("yes")
            }
        }
        dispatch({ type: 'completeNote', payload: completeNote })
    }
}
export const countOfNotesNotCompleted = (userArr) => {
    return (dispatch) => {
        let NotComplete, notes = 0
        const result = userArr.filter(obj => obj.NotComplete === true);
        for (NotComplete in result) {
            if (result.hasOwnProperty(NotComplete)) {
                notes++
                // alert("yes")
            }
        }
        dispatch({ type: 'NotCompleteNote', payload: notes })
    }
}

export const modalShow = (task) => {
    return {
        type: MODELSHOW,
        payload: task
    }
}
export const colorModalShow = (task) => {
    return {
        type: COLOR_MODEL_SHOW,
        payload: task
    }
}

export const onTitleChanged = (title) => {
    return {
        type: TITLE_CHANGED,
        payload: title
    }
}

export const onNoteChanged = (note) => {
    return {
        type: NOTE_CHANGE,
        payload: note
    }
}

export const addNewNote = (title, note, color) => {
    return (dispatch) => {
        dispatch({ type: LOADING, payload: true })
        const updateDBRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc();
        updateDBRef.set({
            Notes: note,
            // isLikes: this.state.islike,
            notesHeading: title,
            notesdate: new Date().getTime(),
            textColor: color,
            image: '',
            NotComplete: true
            // img: this.state.images
        })
            .then(() => {
                dispatch({ type: LOADING, payload: false })
                Actions.notes()
            })

            .catch((error) => {
                alert(error)
            });
    }
}

export const deleteNote = (key) => {
    return (dispatch) => {
        // dispatch({ type: LOADING, payload: true })
        const dbRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc(key)
        dbRef.delete().then(() => {
            // dispatch({ type: LOADING, payload: false })
            console.log('Item removed from database')
        })
    }
}
export const textColorChanged = (color) => {
    return {
        type: SELECT_TEXT_COLOR,
        payload: color
    }

}
export const addNewNoteWithImage = (title, imageUrl, color) => {
    return (dispatch) => {
        dispatch({ type: LOADING, payload: true })
        const updateDBRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc();
        updateDBRef.set({
            image: imageUrl,
            // isLikes: this.state.islike,
            notesHeading: title,
            notesdate: new Date().getTime(),
            textColor: color,
            Complete: true
            // img: this.state.images
        })
            .then(() => {
                dispatch({ type: LOADING, payload: false })
                Actions.notes()
            })

            .catch((error) => {
                alert(error)
            });
    }
}

export const loading = (task) => {
    return {
        type: 'loadingShow',
        payload: task
    }
}

export const updateNotes = (title, note, color, date, key) => {
    return (dispatch) => {
        dispatch({ type: LOADING, payload: true })
        const updateDBRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc(key);
        updateDBRef.set({
            Notes: note,
            // isLikes: this.state.islike,
            notesHeading: title,
            notesdate: date,
            textColor: color,
            image: '',
            Complete: true
            // img: this.state.images
        })
            .then(() => {
                dispatch({ type: LOADING, payload: false })
                Actions.notes()
            })

            .catch((error) => {
                alert(error)
            });
    }
}

export const onLoginOrRegisterFacebook = () => {
    LoginManager.logInWithPermissions(["public_profile"]).then(
        function (result) {
            if (result.isCancelled) {
                console.log("Login cancelled");
            } else {
                console.log(
                    "Login success with permissions: " +
                    result.grantedPermissions.toString()
                );
            }
        },
        function (error) {
            console.log("Login fail with error: " + error);
        }
    );

    // LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    //     .then((result) => {
    //         if (result.isCancelled) {
    //             return Promise.reject(new Error('The user cancelled the request'));
    //         }      // Retrieve the access token
    //         return AccessToken.getCurrentAccessToken();
    //     })
    //     .then((data) => {
    //         // Create a new Firebase credential with the token
    //         const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);      // Login with the credential
    //         return firebase.auth().signInWithCredential(credential);
    //     })
    //     .then((user) => {
    //         // If you need to do anything with the user, do it here
    //         // The user will be logged in automatically by the
    //         // `onAuthStateChanged` listener we set up in App.js earlier
    //         dispatch({ type: LOGIN_USER_SUCCESS, payload: user })
    //         Actions.main()
    //     })
    //     .catch((error) => {
    //         // const { code, message } = error;
    //         alert(error)
    //         dispatch({ type: LOGIN_USER_FAIL })
    //         // For details of error codes, see the docs
    //         // The message contains the default Firebase string
    //         // representation of the error
    //     });
}

export const onLoginOrRegisterGoogle = async () => {
    try {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '764953698402-eltjtrc0i0kflcv7pkkplqtj45i4vj0s.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            //hostedDomain: '', // specifies a hosted domain restriction
            //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            //accountName: '', // [Android] specifies an account name on the device that should be used
            // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        });
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        // const currentUser = await GoogleSignin.getCurrentUser();
        // console.log(currentUser)
        const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
        // login with credential
        const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
        // Actions.main()
        googleSignIn(firebaseUserCredential)
        Actions.main()
        //this.setState({ userInfo });
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
        } else {
            // some other error happened
        }
        alert(error)
    }
};
export const googleSignIn = (currentUser) => {
    alert("okay")
    console.log(currentUser)
    return {
        type: LOGIN_USER_SUCCESS,
        payload: currentUser
    }
}
