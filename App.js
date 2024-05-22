
import * as React from 'react'; //need for react
import {NavigationContainer} from '@react-navigation/native'; //need for navigation between screens
import {createNativeStackNavigator} from '@react-navigation/native-stack'; //need for navigation between screens
import LoginScreen from './Screens/LoginScreen'; //need to use this screen
import ProfileScreen from './Screens/ProfileScreen'; //need to use this screen

const Stack = createNativeStackNavigator(); //creates a stack for the screens


const App = () => {
  return (
    <NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen
          name="Home" //home screen
          component={LoginScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
