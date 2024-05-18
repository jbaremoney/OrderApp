import React from 'react';
import { View, Button, Text, TextInput, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username:</Text>
      <TextInput style={styles.input} placeholder="Enter your username" />
      <Text style={styles.label}>Password:</Text>
      <TextInput style={styles.input} secureTextEntry={true} placeholder="Enter your password" />
      <Button title="Login" onPress={() => alert("Login Functionality to be implemented")} />
      <Button
        title="Create Account"
        onPress={() => navigation.navigate('CreateAccount')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default LoginScreen;
