import { createStackNavigator } from '@react-navigation/stack';
import Notes from './src/NotesList'
import Login from './src/LoginPage'
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Display from './src/NoteDispaly'
import { Image, View, Dimensions, Text } from 'react-native';
import model from './src/model'
import UsersData from './src/UsersData';
import UserDetails from './src/UserDetails';
import SignUp from './src/SignUp';
const Stack = createStackNavigator();
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      >
        <Stack.Screen name="LoginPage" component={Login}

          options={{
            title: 'Notes',
            headerStyle: {
              backgroundColor: '#3498db',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
              alignSelf: 'center',
              marginLeft: screenWidth / 2.5
            },
          }}

        />
        <Stack.Screen name="NotesPage" component={Notes}
          options={{
            // headerStyle: {
            //   backgroundColor: '#3498db',
            // },
            headerShown: false,
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25
            },
          }}

        />
        <Stack.Screen name="Display" component={Display}
          options={{
            // headerStyle: {
            //   backgroundColor: '#3498db',
            // },
            headerShown: false,
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25
            },
          }} />
        <Stack.Screen name="model" component={model} />
        <Stack.Screen name="user" component={UsersData} />
        <Stack.Screen name="details" component={UserDetails} />
        <Stack.Screen name="signup" component={SignUp}
          options={{
            headerShown: false,

          }}

        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// const hearderImage = () => {
//   return (
//     <View style={{ flexDirection: 'row', }}>
//       <Image
//         source={require('./images/add.png')}

//         style={{
//           width: 40,
//           height: 40,
//           borderRadius: 40 / 2,
//           marginLeft: 15,
//         }}>

//       </Image>

//     </View>

//   )


// }

