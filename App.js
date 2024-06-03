//TODO make main navigator stuff work, make login work 

import AuthNavigator from '/Users/z3u5/OrderApp/accountAuth/AuthNavigator.js'
import MainNavigator from '/Users/z3u5/OrderApp/mainStuff/mainNavigator.js'

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from './firebaseStuff/firebaseConfig';  

const auth = getAuth(app);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default App;
