/**
 * @format
 */
import React, { Fragment, Component } from 'react';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import model from './src/model'
import firebase from 'react-native-firebase';
import SignIn from './src/signIn';
import { Count } from './src/Count';
import deshboard from './src/screens/deshboard'
// import App from './src/redux/App'

AppRegistry.registerComponent(appName, () => App);
// import { Provider } from 'react-redux';

// import configureStore from './src/redux/store/configureStore';

// const store = configureStore()

// const RNRedux = () => (
//     <Provider store={store}>
//         <App />
//     </Provider>
// )

// AppRegistry.registerComponent(appName, () => RNRedux);
