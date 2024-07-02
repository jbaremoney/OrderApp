//TODO make this screen funcitonal, as it just displays text. 

import { Image, View, Text, ScrollView, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import styles from '../UI/StyleSheet';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebaseStuff/firebaseConfig'; // Adjust the import path as per your file structure
import { doc, getDoc} from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';


const placeholderFunction = () => {
  console.log("This doesn't do anything yet"); // this is just for the buttons that don't have functions yet.
};

const UserScreen = () => {
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
      } catch (error) {
        console.error('Error fetching user data:', error); //for errors
      } finally {
        setLoading(false); // Set loading state to false after data fetch completes
      }
    };

    fetchUserData();
  }, []);

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

        {/* <Button title="Select Profile Picture" onPress={pickImage} /> */}
        <Button title = 'Identification' style = {styles.button} onPress={placeholderFunction}/>
        <Button title = 'Payment Method' style = {styles.button} onPress={placeholderFunction}/>
        <Button title = 'Update Information' style = {styles.button} onPress={placeholderFunction}/>
        <Button title = 'Order History' style = {styles.button} onPress={placeholderFunction}/>

      </ScrollView>
    );
  }

export default UserScreen

// import React, { useState, useEffect } from 'react';
// import { View, Image, Button, StyleSheet, Platform } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// const ProfilePicturePicker = () => {
//   const [imageUri, setImageUri] = useState(null);

//   useEffect(() => {
//     (async () => {
//       if (Platform.OS !== 'web') {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//           alert('Permission to access media library is required!');
//         }
//       }
//     })();
//   }, []);

//   const selectImage = async () => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });

//       if (!result.cancelled) {
//         setImageUri(result.uri);
//         console.log({imageUri})
//       }
//       else{
//         setImageUri("https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Can_Coors_Light.jpg/800px-Can_Coors_Light.jpg");
//       }
//     } catch (error) {
//       console.log('Error reading an image', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.imageContainer}>
//         {imageUri ? (
//           <Image key={imageUri} source={{ uri: imageUri }} style={styles.image} />
//         ) : (
//           <Image source={{uri: "https://hopcitybeer.com/cdn/shop/products/bud_light_d3e4898b-b744-4952-a3c3-e7feb28a00d4.png?v=1684175488&width=480" }} style={styles.image} />
//         )}
//       </View>
//       <Button title="Select Profile Picture" onPress={selectImage} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   imageContainer: {
//     marginBottom: 20,
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     overflow: 'hidden',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
// });

// export default ProfilePicturePicker;

// import { useState } from 'react';
// import { Button, Image, View, StyleSheet } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// export default function ImagePickerExample() {
//   const [image, setImage] = useState(null);

//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       {image && <Image source={{ uri: image }} style={styles.image} />}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     width: 200,
//     height: 200,
//   },
// });