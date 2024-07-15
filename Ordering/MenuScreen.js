
import CreateCollapsible from '../UI/CreateCollapsible';
import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Text, Button, Image, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import Styles from '../UI/StyleSheet'
import {db} from '../firebaseStuff/firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';



const MenuScreen = ({ route }) => {
    const { barId } = route.params;
    const [drinks, setDrinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
      const fetchBars = async () => {
        try {
          console.log("Fetching bars...");
          const drinkCollection = collection(db, 'bars', barId, 'drinks');
          const drinkSnapshot = await getDocs(drinkCollection);
          //console.log("Bars snapshot: ", barsSnapshot);
          const drinkList = drinkSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          setDrinks(drinkList);
        } catch (error) {
          setError(error);
          console.error("Error fetching bars: ", error);
         } finally {
           setLoading(false);
        }
      };
  
      fetchBars();
    }, []);

    const groupedData = drinks.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);
      return acc;
    }, {});

    const [typeStates, setTypeStates] = useState({});

    // Step 4: Helper function to toggle state for each type
    const toggleCollapse = (type) => {
      setTypeStates(prevState => ({
        ...prevState,
        [type]: !prevState[type]
      }));
    };

    if (loading) {
      return <Text>Loading...</Text>;
    }
  
    if (error) {
      return <Text>Error: {error.message}</Text>;
    }

    return (
        <ScrollView contentContainerStyle = {Styles.scrollView}>
          {Object.keys(groupedData).map(type => (
            <CreateCollapsible 
              key = {type}
              title = {type}
              barId = {barId} 
              info = {groupedData[type]} 
              collapsed = {!typeStates[type]} 
              setCollapsed = {() => toggleCollapse(type)}
            />
          ))}
          
        </ScrollView>
    );
}

export default MenuScreen