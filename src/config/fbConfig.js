import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/storage';
// import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCHabqLJAhfYvXFibUn7YICxcKlBwbhYQw",
  authDomain: "ctube-1fe60.firebaseapp.com",
  databaseURL: "https://ctube-1fe60.firebaseio.com",
  projectId: "ctube-1fe60",
  storageBucket: "ctube-1fe60.appspot.com",
  messagingSenderId: "786494538745",
  appId: "1:786494538745:web:4aef94405afbf14a9bf328",
  measurementId: "G-TVM1RYCLV7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.firestore().settings({timestampsInSnapshots:true});

const storage = firebase.storage();


export {
  storage, firebase as default
};