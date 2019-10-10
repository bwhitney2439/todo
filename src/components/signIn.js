import React, { useContext } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { TodoContext } from "../contexts/TodoContext";
// import undefined from "firebase/empty-import";
// import firebase from "../config/firebase";
const SignIn = () => {
  const { authUser, firebase } = useContext(TodoContext);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.app.auth.GithubAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };

  // if (authUser === null) {
  //   return <></>;
  // }

  console.log(authUser);
  if (authUser === false) {
    return (
      <div>
        {/* <h1>My App</h1>
        <p>Please sign-in:</p> */}
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth} />
      </div>
    );
  } else if (authUser === true) {
    return (
      <div>
        {/* <h1>My App</h1>
      <p>Welcome {firebase.auth.currentUser.email}! You are now signed-in!</p> */}
        <button onClick={() => firebase.doSignOut()}>Sign-out</button>
      </div>
    );
  } else return null;
};

export default SignIn;
