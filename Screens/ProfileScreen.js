import React from 'react';
import { View, Image, StyleSheet, Text, Button} from 'react-native';
import myImage from './minionepic.jpg'; //getting an image from file

const ProfileScreen = ({navigation}) => {
    return(
    <View style = {styles.container}>

      <Button //button that goes home
        style = {styles.button} 
        title = 'GO HOME' 
        onPress={() => navigation.navigate("Home")} //navigation.navigate is what navigates screens.
      />

      <Text style = {styles.text}>This is ballss profile</Text> 

      <Image 
        style={styles.tinyLogo}
        source={{ //image from online
          uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png',
        }}
      />
      <Image style = {styles.picture} source={myImage} />
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