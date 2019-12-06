import React, { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { withRouter } from "react-router-dom";
import { AuthUserContext } from "../contexts/AuthUserContext";
// import { FaDivide } from "react-icons/fa";
import Modal from "./Modal";

const SignIn = () => {
  const [showModal, setShowModal] = useState(false);
  const { firebase } = useContext(TodoContext);
  const authUser = useContext(AuthUserContext);

  const handleDismissModal = () => {
    console.log("dismiss");
    setShowModal(false);
  };

  const handleSignIn = () => {
    setShowModal(true);
  };
  const handleSignOut = () => {
    setShowModal(false);
    firebase.doSignOut();
  };

  if (!!authUser === false) {
    return (
      <React.Fragment>
        <button onClick={handleSignIn}>Sign-In</button>
        {showModal ? <Modal dismissModal={handleDismissModal} /> : null}
      </React.Fragment>
    );
  } else if (!!authUser === true) {
    return <button onClick={handleSignOut}>Sign-out</button>;
  } else return null;
};

export default withRouter(SignIn);
