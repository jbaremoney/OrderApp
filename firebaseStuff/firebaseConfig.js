

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "HIDDEN",
    authDomain: "orderapp-4b33a.firebaseapp.com",
    projectId: "orderapp-4b33a",
    storageBucket: "orderapp-4b33a.appspot.com",
    messagingSenderId: "566334245033",
    appId: "1:566334245033:web:c593c586f9c199835cc1b8",
    measurementId: "G-9WD9SY2L7P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth };
