//TODO make main navigator stuff work, make login work 

import AuthNavigator from './accountAuth/AuthNavigator.js'
import MainTabNavigator from './mainStuff/MainTabNavigator.js';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebaseStuff/firebaseConfig';  

// ADD LOGOUT

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => { // listener, if user null, not authenticated
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    // conditional rendering based on auth status
    <NavigationContainer> 
      {isAuthenticated ? <MainTabNavigator /> : <AuthNavigator />} 
    </NavigationContainer>
  );
}

export default App;
