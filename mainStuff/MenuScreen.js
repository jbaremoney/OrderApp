import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firestore = getFirestore();

const MenuScreen = ({ route }) => {
  const { barId } = route.params;
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const menuCollection = collection(firestore, 'bars', barId, 'menu');
      const menuSnapshot = await getDocs(menuCollection);
      const menuList = menuSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMenu(menuList);
    };

    fetchMenu();
  }, [barId]);

  return (
    <View>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MenuScreen;
