import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useAppState } from "../contexts";
// import { FaDivide } from "react-icons/fa";
import Modal from "./Modal";
import "./SignIn.css";

const SignIn = () => {
  const [showModal, setShowModal] = useState(false);

  const { firebase, authUser } = useAppState();

  const handleDismissModal = () => {
    setShowModal(false);
  };

  const handleSignInSignOut = () => {
    if (!!authUser === true) {
      firebase.doSignOut();
    } else {
      setShowModal((prevState) => !prevState);
    }
  };

  console.log(showModal);

  return (
    <React.Fragment>
      <button type="button" onClick={handleSignInSignOut}>
        {!!authUser !== true ? "Sign-In" : "Sign-Out"}
      </button>
      {showModal ? <Modal dismissModal={handleDismissModal} /> : null}
    </React.Fragment>
  );
};

export default withRouter(SignIn);
