//TODO make this screen funcitonal, as it just displays text. 

import { Image, View, Text, ScrollView, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import styles from '../UI/StyleSheet';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';




const IdentificationScreen = () => {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [2, 1],
      quality: 1,
    });

    //console.log(result); //for testing

    if (!result.canceled) {
      setImage(result.assets[0].uri); //Don't honestly know why this works but it does.
      saveImageUri(result.assets[0].uri); // Save selected image URI to AsyncStorage
    }
  };

  useEffect(() => {
    const fetchID = async () => {
      try {
        // const userId = auth.currentUser.uid; // Get current user's UID from Firebase Authentication
        // const userDocRef = doc(db, 'users', userId);
        // const document = await getDoc(userDocRef);
        // if (document.exists) {
        //   const userData = document.data(); // This should be an object containing your user data
        //   setUsername(userData.username); 
        // } else {
        //   console.log('No such document!');
        // }

        const savedUri = await AsyncStorage.getItem('identificationPictureUri');
        if (savedUri !== null) {
          setImage(savedUri);
        }

      } catch (error) {
        console.error('Error fetching user data:', error); //for errors
      } finally {
        setLoading(false); // Set loading state to false after data fetch completes
      }
    };

    fetchID();
  }, []);

  const saveImageUri = async (uri) => {
    try {
      await AsyncStorage.setItem('identificationPictureUri', uri);
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
        <Text style = {styles.title}> Identification </Text>
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <Image source={{uri: "https://hopcitybeer.com/cdn/shop/products/bud_light_d3e4898b-b744-4952-a3c3-e7feb28a00d4.png?v=1684175488&width=480" }} style={styles.profileImage} /> 
          )}
        </TouchableOpacity>
{/*         
        <Text style = {styles.text}>Favorite Bar: *insert a way to choose*</Text>
        <Text style = {styles.text}>Favorite Drink: *insert a way to choose*</Text>

        {/* <Button title="Select Profile Picture" onPress={pickImage} /> 
        <Button title = 'Identification' style = {styles.button} onPress={placeholderFunction}/>
        <Button title = 'Payment Method' style = {styles.button} onPress={placeholderFunction}/>
        <Button title = 'Update Information' style = {styles.button} onPress={placeholderFunction}/>
        <Button title = 'Order History' style = {styles.button} onPress={placeholderFunction}/> */}

      </ScrollView>
    );
  }

export default IdentificationScreen
