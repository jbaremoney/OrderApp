import React from 'react';
import { View, Text, Image, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Styles from './StyleSheet';
import useCartStore from '../Ordering/CartManage'; // Adjust the import path as necessary

const CreateDrink = ({ drink, add = true, remove = false, quantity = false }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const cartItem = useCartStore((state) => state.cart.find((item) => item.drink.id === drink.id));
  const cart = useCartStore((state) => state.cart)

  const { name, price, imageLink } = drink;
  

  const handleAddToCart = () => {
    addToCart(drink);
    console.log(drink)
    console.log("Cart contents: ", cart)
  };

  const handleRemoveFromCart = () => {
    removeFromCart(drink);
    console.log(cart)
  };

  const handleDecreaseQuantity = () => {
    decreaseQuantity(drink);
  };

  if (!drink || !name || !price || !imageLink) {
    return (
      <View style={Styles.createDrinkContainer}>
        <Text style={Styles.text}>Invalid drink data</Text>
      </View>
    );
  }

  return (
    <View style={Styles.createDrinkContainer}>
      <Image style={Styles.image} source={{ uri: imageLink }} />
      <View style={Styles.subContainer}>
        <Text style={Styles.text}>
          {name} - ${price}
        </Text>
        {add && (
          <Button
            style={Styles.button}
            title="Add to Cart"
            onPress={handleAddToCart}
          />
        )}
        {remove && (
          <Button
            style={Styles.button}
            title="Remove from Cart"
            onPress={handleRemoveFromCart}
          />
        )}
        {quantity && cartItem && (
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={handleDecreaseQuantity}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{cartItem.quantity}</Text>
            <TouchableOpacity onPress={handleAddToCart}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    fontSize: 24,
    paddingHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});

export default CreateDrink;
