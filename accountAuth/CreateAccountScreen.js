import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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
          email: email,
          cart: {}
          
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        title="Create Account"
        onPress={handleSignUp}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  input: {
      width: '80%',
      height: 40,
      padding: 10,
      borderWidth: 1,
      borderColor: 'gray',
      marginBottom: 10
  },
  error: {
      color: 'red',
  }
});
