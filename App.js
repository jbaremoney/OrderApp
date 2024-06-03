
import * as React from 'react'; //need for react
import {Image, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'; //need for navigation between screens
import {createNativeStackNavigator} from '@react-navigation/native-stack'; //need for navigation between screens
import LoginScreen from './Screens/LoginScreen'; //need to use this screen
//import ProfileScreen from './Screens/ProfileScreen'; //need to use this screen
import HomeScreen from './Screens/HomeScreen'; //need to use this screen
import myImage from './Screens/minionepic.jpg'; //getting an image from file

const Stack = createNativeStackNavigator(); //creates a stack for the screens

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={myImage}
    />
  );
}

const App = () => {
  return (
    
    <NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen
          name="Login" //home screen
          component={LoginScreen}
          initialParams = {{email: 'owenreilly@gmail', username: "otschmoe", password: "whatever" }}
          //options={{title: 'Welcome'}}
          options={() => ({ 
            headerTitle: (props) => <LogoTitle {...props} />,
          })}
        />
        
        <Stack.Screen
          name = "Home"
          component={HomeScreen}
          options = {{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer> 
    
  );
};


export default App;