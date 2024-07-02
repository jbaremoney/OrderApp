

import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyAvgN5IbAB3xas_WQErSDs7W7m6vill08s",
    authDomain: "orderapp-4b33a.firebaseapp.com",
    projectId: "orderapp-4b33a",
    storageBucket: "orderapp-4b33a.appspot.com",
    messagingSenderId: "566334245033",
    appId: "1:566334245033:web:c593c586f9c199835cc1b8",
    measurementId: "G-9WD9SY2L7P"
};

const app = initializeApp(firebaseConfig);
//const auth = getAuth(app)
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
const db = getFirestore(app);

export { app, auth, db };
