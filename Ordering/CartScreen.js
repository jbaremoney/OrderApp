import React from 'react';
import { ScrollView, StyleSheet, Text, Button, View } from 'react-native';
import useCartStore from '../Ordering/CartManage'; 
import CreateDrink from '../UI/CreateDrink'; 

const CartScreen = ({navigation}) => {
  const cart = useCartStore((state) => state.cart);
  
  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', cart);
    navigation.navigate('Checkout') 
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={styles.title}>Cart Contents:</Text>
      {cart.length > 0 ? (
        <>
          {cart.map((item, index) => (
            <CreateDrink key={index} drink={item.drink} quantity={true} add={false} remove={true} />
          ))}
          <View style={styles.buttonContainer}>
            <Button title="Checkout" onPress={handleCheckout} />
          </View>
        </>
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
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default CartScreen;

