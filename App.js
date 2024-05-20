
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { View, TextInput, StyleSheet, Text, Button, SafeAreaView} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';




const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home Screen</Text>
    <Button title="Go to Screen 2" onPress={() => navigation.navigate(ProfileScreen)} />
  </View>
};

const ProfileScreen = ({navigation, route}) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

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