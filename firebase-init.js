// public/js/firebase-init.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD1BptrqMaty8Q7MRKFgzhsv3qoebX4D8s",
  authDomain: "voiceofelizuba.firebaseapp.com",
  projectId: "voiceofelizuba",
  storageBucket: "voiceofelizuba.firebasestorage.app",
  messagingSenderId: "95928636092",
  appId: "1:95928636092:web:4292a9c5641881b29036b9",
  measurementId: "G-5LZSGNTV2N"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);