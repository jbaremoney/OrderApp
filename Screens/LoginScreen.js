import React from 'react';
import { View, TextInput, StyleSheet, Text, Button} from 'react-native';
import { StackActions } from '@react-navigation/native';



const LoginScreen = ({navigation}) => {
    const[email, setEmail] = React.useState('') //This is how you have an email variable, and update it.
    const[username, setUserName] = React.useState('')
    const[password, setPassword] = React.useState('')
    const [displayText, setDisplayText] = React.useState(''); //Use displaytext to get all of the above variables combined during a button press
    const [showText, setShowText] = React.useState(false); //Turn on the textbox with this.

    const handleButtonClick = () => { //function that handles the buttonclick
        setDisplayText(email + ' ' + username + ' ' + password);
        setShowText(true);
      };

    return(
    <View style={styles.container}>
      <Text style = {styles.header}>Home Screen</Text>
      <Text style = {styles.text}>Email</Text>

      <TextInput style={styles.input} //textbox
         placeholder='Email'
         value = {email}
         onChangeText={setEmail} //this updates the email variable.
      />
      <Text style = {styles.text}>Username</Text>

      <TextInput style={styles.input}
         placeholder='Username'
         value = {username}
         onChangeText={setUserName} //Updated username variable
      />
      <Text style = {styles.text}>Password</Text>

      <TextInput style={styles.input} 
        secureTextEntry={true} //makes it so you can't see password being entered
        placeholder='Password'
        value = {password}
        onChangeText={setPassword} //Updates password variable
      />

      <Button style = {styles.button} title="Test" onPress={handleButtonClick} /> 
      <Button style = {styles.button} title="Login" onPress={() => navigation.dispatch(
            StackActions.replace('Profile', {
            email: email, username: username, password: password},
      ))}
      /> 
      {showText && <Text style={styles.text}>Display Text: {displayText}</Text>}
      <Button
         title="Update the title"
         onPress={() => navigation.setOptions({ title: 'Updated!', headerStyle: { backgroundColor: '#f4511e',}, })}
      />
    </View>
    )
};

const styles = StyleSheet.create({
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
  });

  export default LoginScreen