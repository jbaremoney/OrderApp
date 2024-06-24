//TODO make this screen funcitonal, as it just displays text.


//This works in two ways, one using the CreateCollapsible.js class, and one hard coding. I'm leaving both here in case we want
//To use either, but I will be using the class method moving forward because I worked hard on it :p

//import CreateDrink from '../Classes/CreateDrink' //make sure this is the correct path
import CreateCollapsible from '../UI/CreateCollapsible';
import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Text, Button, Image, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import Styles from '../UI/StyleSheet'
import {db} from '../firebaseStuff/firebaseConfig'; // Path to your firebaseConfig.js
import { collection, getDocs } from 'firebase/firestore';


export default function MenuScreen() {
    const info = [
      { name: 'dollarita', price: '2.50', imageLink: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png'},
      { name: 'fortnite', price: '1000.00', imageLink: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png'},
      { name: 'dookie', price: '4322345.22', imageLink: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png'},
      { name: 'dollarita', price: '2.50', imageLink: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Skibidi_toilet_screenshot.webp/220px-Skibidi_toilet_screenshot.webp.png'},
    ];

    const [firstCollapsed, setFirstCollapsed] = useState(true)
    const [secondCollapsed, setSecondCollapsed] = useState(true)

    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
      const fetchBars = async () => {
        try {
          console.log("Fetching bars...");
          const drinkCollection = collection(db, 'bars/JoeBlacks-/drinks');
          const drinkSnapshot = await getDocs(drinkCollection);
          //console.log("Bars snapshot: ", barsSnapshot);
          const drinkList = drinkSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          console.log("Drink list: ", drinkList);
          setDrinks(drinkList);
        } catch (error) {
          //setError(error);
          console.error("Error fetching bars: ", error);
        // } finally {
        //   setLoading(false);
        }
      };
  
      fetchBars();
    }, []);

    return (
        <ScrollView contentContainerStyle = {Styles.scrollView}>
          <Text style = {Styles.text}></Text>
          <CreateCollapsible
              title = "First Drink"
              info = {drinks}
              collapsed = {firstCollapsed}
              setCollapsed = {setFirstCollapsed}
          />
          <CreateCollapsible
            title = 'Second Drink'
            info = {info}
            collapsed = {secondCollapsed}
            setCollapsed = {setSecondCollapsed}
          />
        </ScrollView>
    );
}
