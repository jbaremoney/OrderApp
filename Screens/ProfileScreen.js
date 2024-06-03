//TESTER SCREEN THIS DOESN'T AFFECT ANYTHING SO FAR

import React from 'react';
import { View, Image, StyleSheet, Text, Button} from 'react-native';
import { StackActions } from '@react-navigation/native';
import myImage from './minionepic.jpg'; //getting an image from file

const ProfileScreen = ({route, navigation}) => {
    const { email, username, password } = route.params;
    const [count, setCount] = React.useState(0)
    const [showText, setShowText] = React.useState(false); //Turn on the textbox with this.


    function handleButtonClick() { //function that handles the buttonclick
        setCount((c) => c + 1);
        setShowText(true);

    };


    React.useEffect(() => {
      //This all is needed to use navigationbar buttons affect the screen.
        // Use `setOptions` to update the button that we previously specified
        // Now the button includes an `onPress` handler to update the count
        navigation.setOptions({
          headerRight: () => (
            <Button title = "Fun Button" onPress={handleButtonClick} />
          ),
        });
    }, [navigation]);

    return(
    <View style = {styles.container}>

      <Button //button that goes home
        style = {styles.button} 
        title = 'GO HOME' 
        onPress={() => navigation.dispatch(StackActions.replace("Login"))} //navigation.navigate is what navigates screens.
      />

      <Text style = {styles.text}>This is ballss profile</Text> 
      <Text style = {styles.text}>Email: {email}, Username: {username}, Password: {password}</Text>

      <Image 
        style={styles.tinyLogo}
        source={{ //image from online
          uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png',
        }}
      />
      <Image style = {styles.picture} source={myImage} />
      {showText && <Text style = {styles.text}>Hi My Name Jeff: {count}</Text>}

    </View>
    )
};

const styles = StyleSheet.create({ //stylesheet
    container: {
      flex: 1,
      backgroundColor: '#9aae07',
      alignItems: 'center', //center left right
      justifyContent: 'center', //center from top to bottom
      
    },
    input: {
      fontSize: 16,
      height: 40,
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
    tinyLogo: {
        width: 150,
        height: 150,
      },
    picture: {
        width: 300,
        height: 300,
        resizeMode: 'stretch',
    }
  });

  export default ProfileScreen