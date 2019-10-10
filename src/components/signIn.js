import React, { useContext } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { TodoContext } from "../contexts/TodoContext";
const SignIn = () => {
  const { firebase, authUser } = useContext(TodoContext);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.app.auth.GithubAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };

  if (authUser === null) {
    return <></>;
  }
  if (!authUser) {
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
