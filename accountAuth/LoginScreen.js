//Add a show password button

import React, { useState } from 'react';
import { View, Button, Text, TextInput, Alert, ScrollView } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebaseStuff/firebaseConfig.js'; // Ensure this is the correct path to your Firebase auth module export
import Styles from '../UI/StyleSheet'
import CheckBox from '../UI/Checkbox.js';



const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user; // creates user so it's not null
    Alert.alert("Login Success", "You are now logged in!");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Alert.alert("Login Failed", errorMessage);
  });
  };

  


  return (
    <ScrollView contentContainerStyle = {Styles.container}>
    <View style={Styles.container}>
      <Text style={Styles.label}>Email:</Text>
      <TextInput
        style={Styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}  // Update email state when text changes
      />
      <Text style={Styles.label}>Password:</Text>
      <TextInput
        style={Styles.input}
        secureTextEntry={!showPassword}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}  // Update password state when text changes
      /> 
      <CheckBox 
        selected={showPassword} 
        onPress={() => setShowPassword(!showPassword)}
        text='Show password'
      />  
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Create Account"
        onPress={() => navigation.navigate('Create Account')}
      />
    </View>
    </ScrollView>
  );
};


const isAdmin = async (userId) => {
  try{
    const userDoc = await getDoc(doc(db, 'users', userId))
    if (userDoc.exists()){
      const userData = userDoc.data();
      return userData.isAdmin || 'null';
    }
    else {
      console.log("document not found");
      return "null"
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return 'null';
  }
  
}

export default LoginScreen ;
