import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { app, db } from '../firebaseStuff/firebaseConfig';

const BarListScreen = ({ navigation }) => {
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    navigation.navigate('Menu', { barId });
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View>
      <Text>Bar List</Text>
      <FlatList
        data={bars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleBarPress(item.id)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BarListScreen;
