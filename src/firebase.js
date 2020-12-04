import firebase from "firebase/app"
//Realtime database
import 'firebase/database';
// import firebase from "firebase/app"

// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBg77VTyQ5WPuEuRtehp9aN-nSkEM-h5ek",
    authDomain: "project-five-f24a3.firebaseapp.com",
    databaseURL: "https://project-five-f24a3.firebaseio.com",
    projectId: "project-five-f24a3",
    storageBucket: "project-five-f24a3.appspot.com",
    messagingSenderId: "654429106863",
    appId: "1:654429106863:web:3c0d009b99d9c4137b5a5a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;