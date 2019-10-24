import React, { useContext, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { TodoContext } from "../contexts/TodoContext";
import { withRouter } from "react-router-dom";
import AuthUserContext from "../contexts/AuthUserContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const SignIn = props => {
  const { firebase } = useContext(TodoContext);
  const authUser = useContext(AuthUserContext);
  const [error, setError] = useState();

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [firebase.app.auth.GithubAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        <Redirect to="/" />;
        return false;
      }
    }
  };

  // const handleGithubSignIn = () => {
  //   firebase
  //     .doSignInWithGitHub()
  //     .then(socialAuthUser => {
  //       // Create a user in your Firebase Realtime Database too
  //       firebase
  //         .user(socialAuthUser.user.uid)
  //         .set({
  //           username: socialAuthUser.user.displayName,
  //           email: socialAuthUser.user.email,
  //           roles: []
  //         })
  //         .then(() => {
  //           setError(null);
  //           props.history.push("/");
  //         })
  //         .catch(error => {
  //           setError(error);
  //         });
  //     })
  //     .catch(error => {
  //       setError(error);
  //     });
  // };

  if (authUser === undefined) return null;

  if (!!authUser === false) {
    return (
      // <button onClick={handleGithubSignIn}>SignIn with Github</button>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth} />
    );
  } else if (!!authUser === true) {
    return <button onClick={() => firebase.doSignOut()}>Sign-out</button>;
  } else return null;
};

export default withRouter(SignIn);
