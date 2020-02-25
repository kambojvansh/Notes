import { createStackNavigator } from '@react-navigation/stack';
import Notes from './src/NotesList'
import Login from './src/LoginPage'
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Display from './src/NoteDispaly'
import { Image, View } from 'react-native';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Rest of your app code */}
      <Stack.Navigator
      // options={{
      //   headerRight: <hearderImage />,
      // }}
      >
        <Stack.Screen name="LoginPage" component={Login} />
        <Stack.Screen name="NotesPage" component={Notes}



          options={{

            navigationOptions: {
              header: <hearderImage />
            },

            title: 'Notes',
            headerStyle: {
              backgroundColor: '#3498db',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25
            },
          }}

        />
        <Stack.Screen name="Display" component={Display} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export class hearderImage extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: 'row', }}>
        <Image
          source={require('./images/add.png')}
        >
          style={{
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
            marginLeft: 15,
          }}

        </Image>

      </View>

    )

  }


}

