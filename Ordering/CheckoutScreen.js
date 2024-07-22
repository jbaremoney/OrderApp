import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import axios from 'axios';
import useCartStore from './CartManage';
import { db, auth } from '../firebaseStuff/firebaseConfig';
import { collection, addDoc, doc, Timestamp } from 'firebase/firestore';
import { initStripe, useStripe } from '@stripe/stripe-react-native';

const CheckoutScreen = ({ navigation }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [tip, setTip] = useState('');
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  
  const cart = useCartStore((state) => state.cart); // accessing cart attribute of zustand
  const barId = useCartStore((state) => state.bar); // getting bar id to know where to send order
  const getSubtotal = useCartStore((state) => state.getSubtotal);  // accessing get subtotal method of zustand
  const subtotal = getSubtotal(cart);  // set subtotal const using getSubtotal method above

  const TAXRATE = 0.05; // change this
  const taxAmount = TAXRATE * subtotal;

  useEffect(() => {
    // Initialize Stripe
    initStripe({
      publishableKey: 'pk_test_51PcwD52KnQ1b6e5XoMZCvpPMvTudZyVPnjZo7r1X8tS0eeWAferDYSF221E8hp7IO1jEUh6CrV2WS799aUs5dnah00BVY4tj1u',
    });
  }, []);

  const paymentMethods = [
    { id: 1, name: 'Credit Card' },
    { id: 2, name: 'Apple Pay' },
  ];

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleTipChange = (value) => {
    // Remove non-numeric characters except dot
    const cleanedText = value.replace(/[^0-9.]/g, '');
    
    // Split the text into integer and decimal parts
    const parts = cleanedText.split('.');
    let formattedText = cleanedText;
    
    // Ensure there's at most one dot and format decimals
    if (parts.length > 1) {
      const integerPart = parts[0];
      let decimalPart = parts[1];
      decimalPart = decimalPart.slice(0, 2); // Limit decimal part to two digits
      formattedText = `${integerPart}.${decimalPart}`;
    }

    setTip(formattedText);
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

    const userOrderData = {
      bar: barId,
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
      fulfilled: false,
    };
    const barOrderData = {
      customer: currentUser.uid,
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
      fulfilled: false,
    };

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);  // doing same stuff for bar and user, j using slightly diff data
      const barDocRef = doc(db, 'bars', barId);
      
      const ordersCollectionRef = collection(userDocRef, 'OrderHist');
      const barOrdersCollectionRef = collection(barDocRef, 'orders');
      
      await addDoc(ordersCollectionRef, userOrderData);
      await addDoc(barOrdersCollectionRef, barOrderData);

      // Create PaymentIntent on your backend
      const response = await axios.post('https://us-central1-orderapp-4b33a.cloudfunctions.net/createPaymentIntent', {
        cart: userOrderData.items,
        tip: userOrderData.tip,
        taxRate: TAXRATE,
      });

      const { clientSecret } = response.data;

      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
      });

      if (!error) {
        const { error: paymentError } = await presentPaymentSheet();
        
        if (paymentError) {
          Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
        } else {
          Alert.alert('Success', 'Your order is confirmed!');
          navigation.navigate('Confirmation', { userOrderData });
        }
      }
    } catch (error) {
      console.error('Error during checkout: ', error);
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
