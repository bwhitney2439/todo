import React, { useContext } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { TodoContext } from "../contexts/TodoContext";
const SignIn = () => {
  const { authUser, firebase } = useContext(TodoContext);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.app.auth.GithubAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };

  if (authUser === undefined) return null;

  if (!!authUser === false) {
    return (<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth} />);
  } else if (!!authUser === true) {
    return (<button onClick={() => firebase.doSignOut()}>Sign-out</button>);
  } else return null;
};

export default SignIn;
