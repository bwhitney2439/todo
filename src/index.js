import React from "react";
import ReactDOM from "react-dom";
// import App from "./components/App";
// import { createStore, applyMiddleware, compose } from "redux";
// import { Provider } from "react-redux";
// import rootReducer from "./reducers/rootReducer";
// import thunk from "redux-thunk";
// import {
//   createFirestoreInstance,
//   getFirestore,
//   reduxFirestore
// } from "redux-firestore";
// import { ReactReduxFirebaseProvider } from "react-redux-firebase";
// import firebase from "./config/firebaseConfig";
import TodoApp from "./components/TodoApp";
// import firebase from "firebase/app";

// const initialState = {};

// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(
//     applyMiddleware(thunk.withExtraArgument({ getFirestore })),
//     reduxFirestore(firebase)
//   )
// );

// const rrfConfig = {
//   userProfile: "users",
//   attachAuthIsReady: true,
//   useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
// };

// const rrfProps = {
//   firebase,
//   config: rrfConfig,
//   dispatch: store.dispatch,
//   createFirestoreInstance
// };

ReactDOM.render(<TodoApp />, document.querySelector("#root"));
