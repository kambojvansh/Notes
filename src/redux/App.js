
import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import Count from '../../src/Count'
import Login from "../redux/signIn"

const NoteApp = () => {
    return (
        <Provider store={createStore(reducers)}>
            <Login />

        </Provider>
    )
}

export default NoteApp