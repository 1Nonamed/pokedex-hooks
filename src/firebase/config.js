import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4a3YCn1UIDaUVxRh5ipAQJEqOucQL44w",
  authDomain: "pokedex-dr.firebaseapp.com",
  projectId: "pokedex-dr",
  storageBucket: "pokedex-dr.appspot.com",
  messagingSenderId: "317511003168",
  appId: "1:317511003168:web:cb49edc3ca085dd032a045",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export default firebase;
