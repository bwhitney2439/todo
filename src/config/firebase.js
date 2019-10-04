import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACWFnu6HWHoCXSYoOnVSEftZLYWua5lDY",
  authDomain: "todoapp-243e7.firebaseapp.com",
  databaseURL: "https://todoapp-243e7.firebaseio.com",
  projectId: "todoapp-243e7",
  storageBucket: "todoapp-243e7.appspot.com",
  messagingSenderId: "681169528526",
  appId: "1:681169528526:web:617b27820300e4e8"
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.firestore();

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.fieldValue = app.firestore.FieldValue;
    this.auth = app.auth();
    // this.db = app.database();
    this.db = app.firestore();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.doc(`users/${uid}`);

  users = () => this.db.collection("users");

  // **** Todo API ****

  todo = uid => this.db.doc(`todos/${uid}`);
  todos = () => this.db.ref("toods");
}

export default new Firebase();
