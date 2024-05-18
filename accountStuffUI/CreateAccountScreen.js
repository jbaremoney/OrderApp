import React from 'react';
import { View, Button, Text, TextInput, StyleSheet } from 'react-native';

const CreateAccountScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput style={styles.input} placeholder="Enter your email" />
      <Text style={styles.label}>Password:</Text>
      <TextInput style={styles.input} secureTextEntry={true} placeholder="Create a password" />
      <Button title="Sign Up" onPress={() => alert("Sign Up Functionality to be implemented")} />
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

export default CreateAccountScreen;
