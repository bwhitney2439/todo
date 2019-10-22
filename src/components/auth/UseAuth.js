import { useState, useEffect } from "react";
import firebase from "../../config/firebase";
import { withRouter } from "react-router-dom";

const UseAuth = props => {
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    firebase.auth.onAuthStateChanged(user => {
      if (!!user) {
        setAuthUser(user);
        props.history.push("/");
      }
    });
  }, []);

  return authUser;
};

export default withRouter(UseAuth);
