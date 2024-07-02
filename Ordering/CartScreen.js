import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import useCartStore from '../Ordering/CartManage'; 
import CreateDrink from '../UI/CreateDrink'; 

const CartScreen = () => {
  const cart = useCartStore((state) => state.cart);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={styles.title}>Cart Contents:</Text>
      {cart.length > 0 ? (
        cart.map((drink, index) => (
          <CreateDrink key={index} drink={drink} isCart = {true} />
        ))
      ) : (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});

export default CartScreen;

