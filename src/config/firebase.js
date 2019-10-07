import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.fieldValue = app.firestore.FieldValue;
    this.auth = app.auth();
    // this.db = app.database();
    this.db = app.firestore();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = async (email, password) => {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    return await newUser.user.updateProfile({
      displayName: email
    });
  };

  doSignInWithEmailAndPassword = async (email, password) =>
    await this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = async () => await this.auth.signOut();

  doPasswordReset = async email =>
    await this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = async password =>
    await this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.doc(`users/${uid}`);

  users = () => this.db.collection("Users");

  // **** Todo API ****

  todo = uid => this.db.doc(`todos/${uid}`);
  todos = () => this.db.collection("Todos");
}

const firebase = new Firebase();

export default firebase;
