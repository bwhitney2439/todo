import React, { useState } from "react";
import { useAppState } from "../contexts";
// import { FaDivide } from "react-icons/fa";
import "./SignIn.css";
import { Button, Modal } from "@material-ui/core";
import ModalContent from "./ModalContent";

const SignIn = () => {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);
  const [showModal, setShowModal] = useState(false);

  const { firebase, authUser } = useAppState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Button color="inherit" onClick={handleOpen}>
        Sign-In
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ModalContent />
      </Modal>
    </React.Fragment>
  );
};

export default SignIn;
