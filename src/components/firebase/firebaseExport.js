import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBU5UC58tOpS8Ek0phud74plFqJJWWiRuo",
  authDomain: "accentureticketing-63136.firebaseapp.com",
  databaseURL: "https://accentureticketing-63136.firebaseio.com",
  projectId: "accentureticketing-63136",
  storageBucket: "accentureticketing-63136.appspot.com",
  messagingSenderId: "1000969483582"
};
firebase.initializeApp(config);

const storage = firebase.storage();
const database = firebase.database();

export { database, storage, firebase as default };
