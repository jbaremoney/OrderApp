import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import useCartStore from './CartManage';
import { db, auth } from '../firebaseStuff/firebaseConfig'
import { collection, addDoc, doc, Timestamp } from 'firebase/firestore';

const CheckoutScreen = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [tip, setTip] = useState('');
  
  const cart = useCartStore((state) => state.cart) // accessing cart attribute of zustand
  const getSubtotal = useCartStore((state) => state.getSubtotal);  // accessing get subtotal method of zustand
  const subtotal = getSubtotal(cart);  // set subtotal const using getSubtotal method above

  const TAXRATE = 0.05; // change this
  const taxAmount = TAXRATE * subtotal;

  const paymentMethods = [
    { id: 1, name: 'Credit Card' },
    { id: 2, name: 'Apple Pay' },
  ];

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleTipChange = (value) => {
    setTip(value);
  };

  const calculateTotalAmount = () => {
    const tipAmount = parseFloat(tip) || 0;
    return subtotal + taxAmount + tipAmount;
  };

  const handleCheckout = async () => {
  if (!selectedPaymentMethod) {
    Alert.alert('Error', 'Please select a payment method.');
    return;
  }
  const currentUser = auth.currentUser;

  if (!currentUser) {
    Alert.alert('Error', 'User not logged in.');
    return;
  }

  const orderData = {
    paymentMethod: selectedPaymentMethod.name,
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
  };

  try {
    const userDocRef = doc(db, 'users', currentUser.uid); // Replace with dynamic user ID if needed
    const ordersCollectionRef = collection(userDocRef, 'OrderHist');
    await addDoc(ordersCollectionRef, orderData);

    Alert.alert('Success', `Payment of $${calculateTotalAmount().toFixed(2)} made using ${selectedPaymentMethod.name}`);
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
          <Text style={styles.totalText}>Total: ${calculateTotalAmount().toFixed(2)}</Text>
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
