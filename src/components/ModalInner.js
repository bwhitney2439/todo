import React, { useContext, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { TodoContext } from "../contexts/TodoContext";
import { withRouter } from "react-router-dom";
// import { AuthUserContext } from "../contexts/AuthUserContext";
import "./ModalInner.css";

const ModalInner = props => {
  const { firebase } = useContext(TodoContext);
  const [error, setError] = useState();

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

  const handleDismiss = () => {
    console.log("hi there");
    props.dismissModal(false);
  };

  return (
    <div className="modal">
      <div className="modal-content animate" onClick={() => handleDismiss}>
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
              <a href="#" style={{ color: "white" }} className="btn">
                Sign up
              </a>
            </div>
            <div className="col">
              <a href="#" style={{ color: "white" }} className="btn">
                Forgot password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ModalInner);
