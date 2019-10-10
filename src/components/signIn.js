import React, { useContext } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { TodoContext } from "../contexts/TodoContext";
const SignIn = () => {
  const { firebase, isSignedIn } = useContext(TodoContext);

  console.log(firebase.auth.currentUser);
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [firebase.app.auth.GithubAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  if (isSignedIn === null) {
    return <></>;
  }
  if (isSignedIn === false) {
    return (
      <div>
        {/* <h1>My App</h1>
        <p>Please sign-in:</p> */}
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth} />
      </div>
    );
  }
  return (
    <div>
      {/* <h1>My App</h1>
      <p>Welcome {firebase.auth.currentUser.email}! You are now signed-in!</p> */}
      <button onClick={() => firebase.doSignOut()}>Sign-out</button>
    </div>
  );
};

export default SignIn;
