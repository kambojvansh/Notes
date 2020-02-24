import { createStackNavigator } from '@react-navigation/stack';
import Notes from './src/NotesList'
import Login from './src/LoginPage'
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();
import Display from './src/NoteDispaly'

export default function App() {
  return (
    <NavigationContainer>
      {/* Rest of your app code */}
      <Stack.Navigator>
        <Stack.Screen name="LoginPage" component={Login} />
        <Stack.Screen name="NotesPage" component={Notes} />
        <Stack.Screen name="Display" component={Display} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
