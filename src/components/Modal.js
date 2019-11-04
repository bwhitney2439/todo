import React from "react";
import ReactDom from "react-dom";

const Modal = () => {
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

  const JSX_MODAL = (
    <div id="id02" class="modal">
      <div class="modal-content animate">
        <form action="/action_page.php">
          <div class="row">
            <h2 style="text-align:center">
              Login with Social Media or Manually
            </h2>
            <div class="vl">
              <span class="vl-innertext">or</span>
            </div>

            <div class="col">
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth}
              />
            </div>

            <div class="col">
              <div class="hide-md-lg">
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
        <div class="bottom-container">
          <div class="row">
            <div class="col">
              <a href="#" style="color:white" class="btn">
                Sign up
              </a>
            </div>
            <div class="col">
              <a href="#" style="color:white" class="btn">
                Forgot password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(JSX_MODAL, document.querySelector("#modal"));
};

export default Modal;
