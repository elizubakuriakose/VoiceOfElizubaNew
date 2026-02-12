
// main.js - handles Firebase connection and common helpers.
// IMPORTANT: Replace the firebaseConfig object below with your project's config
// and enable the required Firebase services (Firestore) in your Firebase console.

const firebaseConfig = {
  apiKey: "AIzaSyD1BptrqMaty8Q7MRKFgzhsv3qoebX4D8s",
  authDomain: "voiceofelizuba.firebaseapp.com",
  projectId: "voiceofelizuba",
  storageBucket: "voiceofelizuba.firebasestorage.app",
  messagingSenderId: "95928636092",
  appId: "1:95928636092:web:4292a9c5641881b29036b9",
  measurementId: "G-5LZSGNTV2N"
};

// load firebase scripts dynamically
function loadFirebaseAndInit(callback){
  if(window.firebase && window.firebase.apps && window.firebase.apps.length){
    callback();
    return;
  }
  const s1 = document.createElement('script');
  s1.src = "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js";
  s1.onload = ()=>{
    const s2 = document.createElement('script');
    s2.src = "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js";
    s2.onload = ()=>{
      firebase.initializeApp(firebaseConfig);
      window.db = firebase.firestore();
      callback();
    };
    document.head.appendChild(s2);
  };
  document.head.appendChild(s1);
}

// Utility: show simple alerts
function showToast(msg){
  alert(msg);
}

// Format date
function fmtDate(ts){
  try{
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleString();
  }catch(e){ return String(ts); }
}
