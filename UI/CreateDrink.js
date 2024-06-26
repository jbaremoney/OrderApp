import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import Styles from './StyleSheet';
import useCartStore from '../Ordering/CartManage'; // Adjust the import path as necessary

const CreateDrink = ({ drink }) => {
  
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart); // Access the cart state

  const { name, price, imageLink } = drink;

  const handleAddToCart = () => {
    //console.log('Adding drink to cart:', drink); // Ensure this logs the correct drink object
    addToCart(drink);
    console.log("cart contents:", cart); // this is one behind because something about asynchronous
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
        <Button
          style={Styles.button}
          title="Add to Cart"
          onPress={handleAddToCart}

        />
      </View>
    </View>
  );
};

export default CreateDrink;
