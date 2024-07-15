
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import {db} from '../firebaseStuff/firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../UI/StyleSheet';
import customMarkerIcon from '../assets/mapPin.png';




// // Function to fetch places from Firestore
// const fetchPlaces = async () => {
//   const mapRef = collection(db, 'bars');
//   const mapSnapshot = await getDocs(mapRef);
//   return mapSnapshot.docs.map(doc => doc.data());
//   const drinkList = drinkSnapshot.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data()
//   }));
// }

// // Use fetchPlaces() to get places data and then render markers on the map

export default function MapScreen({navigation}) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([]);


  useEffect(() => {
    fetchMap = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const mapRef = collection(db, 'bars');
      const mapSnapshot = await getDocs(mapRef);
      const loadedMarkers = mapSnapshot.docs.map(doc => ({
        id: doc.id,
        latitude: doc.data().latitude,
        longitude: doc.data().longitude,
        name: doc.data().name,
      }));
      setMarkers(loadedMarkers);
    };
    fetchMap();
  }, []);

  const handleMapPress = (barId) => {
    navigation.navigate('Drinks', {barId})
  }

  return (
    <View style={styles.mapContainer}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
            >
              <Icon name={"dot-circle-o"} color={'blue'} size={30} />
            </Marker>
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          title={marker.name}
          // Example of customizing marker icon
          image={customMarkerIcon}
          calloutAnchor={{ x: 0, y: 0 }} // Adjust callout position if needed

        >
          {/* Custom callout */}
          <Callout tooltip>
            <View style={styles.markerContainer}>
              <Text style = {styles.text}>{marker.name}</Text>
              <TouchableOpacity onPress={() => handleMapPress(marker.id)}>
                <View style={{ backgroundColor: 'blue', padding: 10, marginTop: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
                  <Text style={{ color: 'white' }}>View Details</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Callout>
        </Marker>
      ))}

      {/* { width: 150, backgroundColor: 'white', alignContent: 'center' } 
      style={{ fontSize: 16, fontWeight: 'bold' }}*/}
          {/* {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={`${marker.name}`}
            description='Click here'
            image = {customMarkerIcon}
            // You can add more properties like description, onPress events, etc.
            //onCalloutPress = {() => handleMapPress(marker.id)}
            calloutAnchor={{ x: 0.5, y: -0.1 }}
          >
            {/* <Icon name={"map-marker"} color={'red'} size={30} /> 
            <Callout tooltip>
              <View>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{marker.name}</Text>
                <Text>description</Text>
                {/* Example of adding a button 
                <TouchableOpacity onPress={() => handleMapPress(marker.id)}>
                  <View style={{ backgroundColor: 'blue', padding: 10, marginTop: 10 }}>
                    <Text style={{ color: 'white' }}>Press me!</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))} */}
          {/* Add more markers for nearby places from Firebase */}


        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
