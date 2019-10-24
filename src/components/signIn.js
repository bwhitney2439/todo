import React, { useContext, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { TodoContext } from "../contexts/TodoContext";
import { withRouter } from "react-router-dom";
import { AuthUserContext } from "../contexts/AuthUserContext";

const SignIn = props => {
  const { firebase } = useContext(TodoContext);
  const [error, setError] = useState();
  const authUser = useContext(AuthUserContext);

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [firebase.app.auth.GithubAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        const createdAt = new Date();

        firebase
          .user(authResult.user.uid)
          .set({
            username: authResult.user.displayName,
            email: authResult.user.email,
            roles: [],
            createdAt
          })
          .then(() => {
            setError(null);
            props.history.push("/");
          })
          .catch(err => {
            setError(err);
            console.log(error);
          });
        return false;
      }
    }
  };

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
