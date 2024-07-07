//TODO make this screen funcitonal, as it just displays text. 

import { Image, View, Text, ScrollView, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import styles from '../UI/StyleSheet';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebaseStuff/firebaseConfig'; // Adjust the import path as per your file structure
import { doc, getDoc} from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';



const placeholderFunction = () => {
  console.log("This doesn't do anything yet"); // this is just for the buttons that don't have functions yet.
};

const UserScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    //console.log(result); //for testing

    if (!result.canceled) {
      setImage(result.assets[0].uri); //Don't honestly know why this works but it does.
      saveImageUri(result.assets[0].uri); // Save selected image URI to AsyncStorage
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser.uid; // Get current user's UID from Firebase Authentication
        const userDocRef = doc(db, 'users', userId);
        const document = await getDoc(userDocRef);
        if (document.exists) {
          const userData = document.data(); // This should be an object containing your user data
          setUsername(userData.username); 
        } else {
          console.log('No such document!');
        }

        const savedUri = await AsyncStorage.getItem('profilePictureUri'); //gets the profilePic selected before if possible.
        if (savedUri !== null) {
          setImage(savedUri);
        }

      } catch (error) {
        console.error('Error fetching user data:', error); //for errors
      } finally {
        setLoading(false); // Set loading state to false after data fetch completes
      }
    };

    fetchUserData();
  }, []);

  const saveImageUri = async (uri) => {
    try {
      await AsyncStorage.setItem('profilePictureUri', uri); //sends the profile pic chosen to asyncstorage
    } catch (error) {
      console.log('Error saving image URI to AsyncStorage:', error);
    }
  };

  if (loading) { //the ActivityIndicator is basically a loading wheel
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="medium" color="#0000ff" />
      </View>
    );
  }


    return (
      <ScrollView contentContainerStyle = {styles.profileView}>
        <Text style = {styles.title}> {username} </Text>
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <Image source={{uri: "https://hopcitybeer.com/cdn/shop/products/bud_light_d3e4898b-b744-4952-a3c3-e7feb28a00d4.png?v=1684175488&width=480" }} style={styles.profileImage} /> 
          )}
        </TouchableOpacity>
        
        <Text style = {styles.text}>Favorite Bar: *insert a way to choose*</Text>
        <Text style = {styles.text}>Favorite Drink: *insert a way to choose*</Text>

        <Button title = 'Identification' style = {styles.button} onPress={() => navigation.navigate('Identification')}/>
        <Button title = 'Payment Method' style = {styles.button} onPress={() => navigation.navigate('Payment Method')}/>
        <Button title = 'Update Information' style = {styles.button} onPress={() => navigation.navigate('Update Information')}/>
        <Button title = 'Order History' style = {styles.button} onPress={() => navigation.navigate('Order History')}/>

      </ScrollView>
    );
  }

export default UserScreen
