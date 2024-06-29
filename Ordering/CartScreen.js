import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import useCartStore from '../Ordering/CartManage'; // Adjust the import path as necessary
import CreateDrink from '../UI/CreateDrink'; // Adjust the import path as necessary
import styles from '../UI/StyleSheet'

const CartScreen = () => {
  const cart = useCartStore((state) => state.cart);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={styles.title}>Cart Contents:</Text>
      {cart.length > 0 ? (
        cart.map((drink, index) => (
          <CreateDrink key={index} drink={drink} remove = {true} />
        ))
      ) : (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      )}
    </ScrollView>
  );
};


export default CartScreen;
