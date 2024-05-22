
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

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    textAlign: 'center',
    height: 40,
    width: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5
  },
  header: {
    fontSize: 30,
    marginBottom: 5
  },
  button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      marginBottom: 10,
    }
});*/

export default App;


/*import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image, Pressable } from 'react-native';

class App extends Component {

  onPress = () => {
    <View >
      <Image source={{ uri: 'https://makeameme.org/meme/kill-yourself-565ec0fc0f'}}/>
    </View>
  };

  render(){
    <View style={styles.container}>
        <Pressable style={styles.button} onPress={this.onPress}>
          <Text>Click me</Text>
        </Pressable>
        <View>
          <Text>You clicked {this.state.count} times</Text>
        </View>
      </View>
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a0b00c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  }
});

export default App;
*/

/*
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/