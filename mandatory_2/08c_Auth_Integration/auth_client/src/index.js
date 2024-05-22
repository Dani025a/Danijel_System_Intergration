import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBWN2ImVRojHkwuPel06izcD4riWiteW4U",
  authDomain: "system-intergration-1ce25.firebaseapp.com",
  projectId: "system-intergration-1ce25",
  storageBucket: "system-intergration-1ce25.appspot.com",
  messagingSenderId: "587156396614",
  appId: "1:587156396614:web:813b1a4b508f9f74244847"
};

firebase.initializeApp(firebaseConfig); 

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
