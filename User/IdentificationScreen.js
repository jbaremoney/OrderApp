import { Image, View, Text, ScrollView, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import styles from '../UI/StyleSheet';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';



const IdentificationScreen = () => {
  const [loading, setLoading] = useState(true);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);


  const pickFrontImage = async () => {
    // Don't wanna mess with async stuff so two separate functions that do the same thing
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [2, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFrontImage(result.assets[0].uri); //Don't honestly know why this works but it does.
      saveImageUri(result.assets[0].uri, 'frontImageUri'); // Save selected image URI to AsyncStorage which persists between sessions
    }
  };

  const pickBackImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [2, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setBackImage(result.assets[0].uri); //Don't honestly know why this works but it does.
      saveImageUri(result.assets[0].uri, 'backImageUri'); // Save selected image URI to AsyncStorage
    }
  };

  useEffect(() => {
    const fetchID = async () => {
      try {
    //AsyncStorage holds all pics, so you can use them in any area of the program.
        const savedFrontUri = await AsyncStorage.getItem('frontImageUri');
        if (savedFrontUri !== null) {
          setFrontImage(savedFrontUri);
        }

        const savedBackUri = await AsyncStorage.getItem('backImageUri');
        if (savedBackUri !== null) {
          setBackImage(savedBackUri);
        }

      } catch (error) {
        console.error('Error fetching user data:', error); //for errors
      } finally {
        setLoading(false); // Set loading state to false after data fetch completes
      }
    };

    fetchID();
  }, []);

  const saveImageUri = async (uri, asyncItemName) => {
    //this sends the image to AsyncStorage under the name asyncItemName
    try {
      await AsyncStorage.setItem(asyncItemName, uri);
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
        <Text style = {styles.title}> Front</Text>
        <TouchableOpacity onPress={pickFrontImage}>
          {frontImage ? (//this picks the regular image or a default one. 
            <Image source={{ uri: frontImage }} style={styles.idImage} />
          ) : (
            <Image source={{uri: "https://hopcitybeer.com/cdn/shop/products/bud_light_d3e4898b-b744-4952-a3c3-e7feb28a00d4.png?v=1684175488&width=480" }} style={styles.idImage} /> 
          )}
        </TouchableOpacity>

        <Text style = {styles.title}> Back</Text>
        <TouchableOpacity onPress={pickBackImage}>
          {backImage ? (
            <Image source={{ uri: backImage }} style={styles.idImage} />
          ) : (
            <Image source={{uri: "https://hopcitybeer.com/cdn/shop/products/bud_light_d3e4898b-b744-4952-a3c3-e7feb28a00d4.png?v=1684175488&width=480" }} style={styles.idImage} /> 
          )}
        </TouchableOpacity>

      </ScrollView>
    );
  }

export default IdentificationScreen
