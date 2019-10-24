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
    this.app = app;

    this.gitHubProvider = new app.auth.GithubAuthProvider();
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

  createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = this.db.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log("error creating user", error.message);
      }
    }

    return userRef;
  };

  doSignInWithEmailAndPassword = async (email, password) =>
    await this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGitHub = () => this.auth.signInWithPopup(this.gitHubProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = async email =>
    await this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = async password =>
    await this.auth.currentUser.updatePassword(password);

  // *** User API ***

  // user = uid => this.db.collection(`users/${uid}`);
  user = uid => this.db.collection("Users").doc(uid);

  users = () => this.db.collection("Users");

  // **** Todo API ****

  todo = id => this.db.collection("Todos").doc(id);
  todos = () => this.db.collection("Todos");
}

const firebase = new Firebase();

export default firebase;
