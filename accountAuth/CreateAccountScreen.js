import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Styles from '../mainStuff/StyleSheet'


export default function CreateAccountScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = () => {
    const auth = getAuth();
    const firestore = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User account created & signed in!
        console.log('User account created & signed in!');
        // After successful creation, store the username in Firestore
        const user = userCredential.user;
        return setDoc(doc(firestore, "users", user.uid), {
          username: username,
          email: email
        });
      })
      .then(() => {
        console.log("Username and email saved in Firestore");
      })
      .catch(error => {
        setError(error.message);
        console.error(error);
      });
  };

  return (
    <View style={Styles.createAccountContainer}>
      <TextInput
        style={Styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={Styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
        autoCapitalize="none"
      />
      <TextInput
        style={Styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      {error ? <Text style={Styles.error}>{error}</Text> : null}
      <Button
        title="Create Account"
        onPress={handleSignUp}
      />
    </View>
  );
}
