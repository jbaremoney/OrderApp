//TODO make main navigator stuff work, make login work 

import AuthNavigator from './accountAuth/AuthNavigator.js'
import MainTabNavigator from './MainTabNavigator.js'

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebaseStuff/firebaseConfig';  
import { StripeProvider } from '@stripe/stripe-react-native';

stripePublishableKey = 'pk_test_51PcwD52KnQ1b6e5XoMZCvpPMvTudZyVPnjZo7r1X8tS0eeWAferDYSF221E8hp7IO1jEUh6CrV2WS799aUs5dnah00BVY4tj1u'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => { // listener, if user null, not authenticated
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
  //conditional rendering based on auth status
  <StripeProvider publishableKey={stripePublishableKey}>
    <NavigationContainer> 
      {isAuthenticated ? <MainTabNavigator /> : <AuthNavigator />} 
    </NavigationContainer>
  </StripeProvider>
  );
}

export default App;
