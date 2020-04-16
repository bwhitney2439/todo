import React, { useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { withRouter } from "react-router-dom";
import { useAppState } from "../contexts";
import "./ModalContent.css";

const ModalContent = (props) => {
  const { firebase } = useAppState();
  const [error, setError] = useState();

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [
      firebase.app.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.app.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.app.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        const createdAt = new Date();
        props.dismissModal();
        firebase
          .user(authResult.user.uid)
          .set({
            username: authResult.user.displayName,
            email: authResult.user.email,
            roles: [],
            createdAt,
          })
          .then(() => {
            setError(null);
            props.history.push("/");
          })
          .catch((err) => {
            console.log("error");
            setError(err);
          });
        return false;
      },
    },
  };

  return (
    <div className="modal" onClick={props.dismissModal}>
      <div
        className="modal-content animate"
        onClick={(event) => event.stopPropagation()}
      >
        <form action="/action_page.php">
          <div className="row">
            <h2 style={{ textAlign: "center" }}>
              Login with Social Media or Manually
            </h2>
            <div className="vl">
              <span className="vl-innertext">or</span>
            </div>

            <div className="col">
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth}
              />
            </div>

            <div className="col">
              <div className="hide-md-lg">
                <p>Or sign in manually:</p>
              </div>

              <input
                type="text"
                name="username"
                placeholder="Username"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <input type="submit" value="Login" />
            </div>
          </div>
        </form>
        <div className="bottom-container">
          <div className="row">
            <div className="col">
              <div style={{ color: "white" }} className="btn">
                Sign up
              </div>
            </div>
            <div className="col">
              <div style={{ color: "white" }} className="btn">
                Forgot password?
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ModalContent);
