import React, { useContext, useState } from "react";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { TodoContext } from "../contexts/TodoContext";
import { withRouter } from "react-router-dom";
import { AuthUserContext } from "../contexts/AuthUserContext";
import { FaDivide } from "react-icons/fa";
import Modal from "./Modal";
const SignIn = props => {
  const [showModal, setShowModal] = useState(false);
  const { firebase } = useContext(TodoContext);
  // const [error, setError] = useState();
  const authUser = useContext(AuthUserContext);

  const handleDismissModal = () => {
    setShowModal(false);
  };

  if (!!authUser === false) {
    return (
      <React.Fragment>
        <button onClick={() => setShowModal(!showModal)}>Sign-In</button>
        {showModal ? <Modal dismissModal={() => handleDismissModal} /> : null}
      </React.Fragment>
    );
  } else if (!!authUser === true) {
    return <button onClick={() => firebase.doSignOut()}>Sign-out</button>;
  } else return null;
};

export default withRouter(SignIn);
