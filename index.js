/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import model from './src/model'
import firebase from 'react-native-firebase';
import SignIn from './src/signIn';
import { Count } from './src/Count';
import SignUp from './src/signUp';

AppRegistry.registerComponent(appName, () => SignUp);
