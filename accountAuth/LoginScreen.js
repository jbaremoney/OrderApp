import React, { useState } from 'react';
import { View, Button, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, app } from '/Users/z3u5/OrderApp/firebaseStuff/firebaseConfig.js'; // Ensure this is the correct path to your Firebase auth module export



const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert("Success", "You are logged in!");
        navigation.navigate('mainNavigator');
      })
      .catch(error => {
        Alert.alert("Authentication Failed", error.message);
      });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}  // Update email state when text changes
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}  // Update password state when text changes
      />
      <Button title="Login" onPress={handleLogin} />
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
