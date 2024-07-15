import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebaseStuff/firebaseConfig';
import styles from '../UI/StyleSheet';

const OrderHistoryScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log("Fetching order history...");
        const userId = auth.currentUser.uid;
        const ordersCollection = collection(db, 'users', userId, 'OrderHist');
        const ordersSnapshot = await getDocs(ordersCollection);
        
        const ordersList = ordersSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            items: data.items,
            paymentMethod: data.paymentMethod,
            time: data.timestamp ? data.timestamp.toDate() : null,
            tip: data.tip,
            totalAmount: data.totalAmount
          };
        });

        setOrders(ordersList);
      } catch (error) {
        setError(error);
        console.error("Error fetching order history: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Order History</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text style={styles.text}>Order ID: {item.id}</Text>
            <Text style={styles.text}>Items</Text>
            {item.items.map(drink => (
              <Text key={drink.id} style={styles.text}>
                {drink.name} - ${drink.price} -------- {drink.quantity}
              </Text>
            ))}
            <Text style={styles.text}>Payment Method: {item.paymentMethod}</Text>
            <Text style={styles.text}>Time: {item.time ? item.time.toString() : 'N/A'}</Text>
            <Text style={styles.text}>Tip: {item.tip}</Text>
            <Text style={styles.text}>Total Amount: {item.totalAmount}</Text>
          </View>
        )}
      />

    </View>
  );
};

export default OrderHistoryScreen;
