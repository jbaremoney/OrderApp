import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';

const OrderConfirmationScreen = ({ route, navigation }) => {
  const { userOrderData } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Order Confirmation</Text>
      
      <Text style={styles.subtitle}>Bar: {userOrderData.bar}</Text>
      <Text style={styles.subtitle}>Payment Method: {userOrderData.paymentMethod}</Text>
      <Text style={styles.subtitle}>Order Total: ${userOrderData.totalAmount.toFixed(2)}</Text>
      <Text style={styles.subtitle}>Tip: ${userOrderData.tip.toFixed(2)}</Text>
      <Text style={styles.subtitle}>Tax: ${userOrderData.tax.toFixed(2)}</Text>

      <Text style={styles.title}>Order Items</Text>
      {userOrderData.items.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.itemText}>{item.name} x{item.quantity} - ${Number(item.price).toFixed(2) * item.quantity}</Text>
        </View>
      ))}

      
      <Button title="Back to Home" onPress={() => navigation.navigate('HomeScreen')} /> {/*fix this!!!*/}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  item: {
    marginVertical: 10,
  },
  itemText: {
    fontSize: 16,
  },
});

export default OrderConfirmationScreen;
