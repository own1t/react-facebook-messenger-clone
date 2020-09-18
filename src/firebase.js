import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDdzjq371wlBD7d7ghyrm9MeT223KEUz4A",
  authDomain: "fb-messenger-f0d13.firebaseapp.com",
  databaseURL: "https://fb-messenger-f0d13.firebaseio.com",
  projectId: "fb-messenger-f0d13",
  storageBucket: "fb-messenger-f0d13.appspot.com",
  messagingSenderId: "634602799010",
  appId: "1:634602799010:web:ddbe834ff3a095e5c6bcfb",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
