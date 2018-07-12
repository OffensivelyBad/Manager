import firebase from 'firebase';
import firebaseconfig from './firebaseconfig';

var FirebaseAuth = firebase.initializeApp(firebaseconfig, "Auth");

export default FirebaseAuth;
