import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import useCartStore from './CartManage';
import { db, auth } from '../firebaseStuff/firebaseConfig';
import { collection, addDoc, doc, Timestamp } from 'firebase/firestore';

import axios from 'axios';

const CheckoutScreen = ({ navigation }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [tip, setTip] = useState('');
  // const { initPaymentSheet, presentPaymentSheet } = useStripe();
  
  const cart = useCartStore((state) => state.cart);
  const barId = useCartStore((state) => state.bar);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const subtotal = getSubtotal(cart);

  const TAXRATE = 0.05;
  const taxAmount = TAXRATE * subtotal;

  const paymentMethods = [
    { id: 1, name: 'Credit Card' },
    { id: 2, name: 'Apple Pay' },
  ];

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleTipChange = (value) => {
    const cleanedText = value.replace(/[^0-9.]/g, '');
    const parts = cleanedText.split('.');
    let formattedText = cleanedText;

    if (parts.length > 1) {
      const integerPart = parts[0];
      let decimalPart = parts[1];
      decimalPart = decimalPart.slice(0, 2);
      formattedText = `${integerPart}.${decimalPart}`;
    }

    setTip(formattedText);
  };

  const calculateTotalAmount = () => {
    const tipAmount = parseFloat(tip) || 0;
    return subtotal + taxAmount + tipAmount;
  };

  // const fetchPaymentSheetParams = async () => {
  //   const response = await fetch('https://your-cloud-function-url/createPaymentIntent', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ cart, tip, taxRate: TAXRATE }),
  //   });

  //   const { clientSecret } = await response.json();
  //   return clientSecret;
  // };

  // const initializePaymentSheet = async () => {
  //   const clientSecret = await fetchPaymentSheetParams();

  //   const { error } = await initPaymentSheet({
  //     paymentIntentClientSecret: clientSecret,
  //     merchantDisplayName: 'Your Merchant Name',
  //   });

  //   if (!error) {
  //     await presentPaymentSheet();
  //     handleCheckout();
  //   } else {
  //     Alert.alert('Error', error.message);
  //   }
  // };

  const handleCheckout = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      Alert.alert('Error', 'User not logged in.');
      return;
    }

    const userOrderData = {
      bar: barId,
      paymentMethod: selectedPaymentMethod ? selectedPaymentMethod.name : 'Stripe',
      totalAmount: calculateTotalAmount(),
      timestamp: Timestamp.now(),
      items: cart.map(item => ({
        id: item.drink.id,
        name: item.drink.name,
        price: item.drink.price,
        quantity: item.quantity,
      })),
      tip: parseFloat(tip) || 0,
      tax: taxAmount,
      fulfilled: false,
    };

    const barOrderData = {
      customer: currentUser.uid,
      paymentMethod: selectedPaymentMethod ? selectedPaymentMethod.name : 'Stripe',
      totalAmount: calculateTotalAmount(),
      timestamp: Timestamp.now(),
      items: cart.map(item => ({
        id: item.drink.id,
        name: item.drink.name,
        price: item.drink.price,
        quantity: item.quantity,
      })),
      tip: parseFloat(tip) || 0,
      tax: taxAmount,
      fulfilled: false,
    };

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);  // doing same stuff for bar and user, j using slightly diff data
      const barDocRef = doc(db, 'bars', barId);
      
      const ordersCollectionRef = collection(userDocRef, 'OrderHist');
      const barOrdersCollectionRef = collection(barDocRef, 'orders')
      
      await addDoc(ordersCollectionRef, userOrderData);
      await addDoc(barOrdersCollectionRef, barOrderData);

      const response = await axios.post('https://us-central1-orderapp-4b33a.cloudfunctions.net/createPaymentIntent', {
        cart: userOrderData.items,
        tip: userOrderData.tip,
        taxRate: TAXRATE,
      });

      const { clientSecret } = response.data;

      Alert.alert('Success', `Payment of $${calculateTotalAmount().toFixed(2)} made using ${selectedPaymentMethod.name}`);
      console.log("success placing order")
      navigation.navigate('Confirmation', { userOrderData, clientSecret });
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'There was an issue processing your order. Please try again.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Checkout</Text>

        <Text style={styles.subtitle}>Select Payment Method:</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentMethod,
              selectedPaymentMethod?.id === method.id && styles.selectedPaymentMethod,
            ]}
            onPress={() => handlePaymentMethodSelect(method)}
          >
            <Text style={styles.paymentMethodText}>{method.name}</Text>
            {selectedPaymentMethod?.id === method.id && (
              <Icon name="check-circle" type="font-awesome" color="green" />
            )}
          </TouchableOpacity>
        ))}

        <Text style={styles.subtitle}>Add a Tip:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter tip amount"
          keyboardType="numeric"
          value={tip}
          onChangeText={handleTipChange}
        />

        <View>
          <Text style={styles.subtitle}>Subtotal: ${subtotal.toFixed(2)}</Text>
          <Text style={styles.subtitle}>Tax: ${taxAmount.toFixed(2)}</Text>
          <Text style={styles.subtitle}>Tip: ${parseFloat(tip || 0).toFixed(2)}</Text>
          <Text style={styles.title}>Total: ${calculateTotalAmount().toFixed(2)}</Text>
        </View>

        <Button
          title="Proceed to Payment"
          onPress={handleCheckout}
          buttonStyle={styles.checkoutButton}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedPaymentMethod: {
    borderColor: 'green',
    backgroundColor: '#e0ffe0',
  },
  paymentMethodText: {
    fontSize: 16,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  summary: {
    marginVertical: 20,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: 'blue',
    padding: 15,
  },
});

export default CheckoutScreen;
