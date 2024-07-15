import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseStuff/firebaseConfig';
import styles from '../UI/StyleSheet';
 


const BarListScreen = ({ navigation }) => {
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //const setBar = useCartStore((state) => state.setBar); dont do this here

  useEffect(() => {
    const fetchBars = async () => {
      try {
        console.log("Fetching bars...");
        const barsCollection = collection(db, 'bars');
        const barsSnapshot = await getDocs(barsCollection);
        console.log("Bars snapshot: ", barsSnapshot);
        const barsList = barsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("Bars list: ", barsList);
        setBars(barsList);
      } catch (error) {
        setError(error);
        console.error("Error fetching bars: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBars();
  }, []);

  const handleBarPress = (barId) => {
    navigation.navigate('Drinks', { barId });
    


  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style = {styles.container}>
      <Text style = {styles.headerText}>Bar List</Text>
      <FlatList
        data={bars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style = {styles.button} onPress={() => handleBarPress(item.id)}>
            <Text style = {styles.barListText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BarListScreen;