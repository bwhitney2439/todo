import React, { useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useAppState } from "../contexts";
import "./ModalContent.css";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const ModalContent = () => {
  const { firebase } = useAppState();
  const [error, setError] = useState();

  const uiConfig = {
    signInFlow: "redirect",
    signInSuccessUrl: "http://localhost:3000/home",
    signInOptions: [
      firebase.app.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.app.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.app.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        const createdAt = new Date();
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
          })
          .catch((err) => {
            console.log("error");
            setError(err);
          });

        return true;
      },
    },
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      // border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth} />
    </div>
  );
};

export default ModalContent;
