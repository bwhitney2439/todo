import React from "react";
import ReactDOM from "react-dom";

import ModalContent from "./ModalContent";

const Modal = props => {
  return ReactDOM.createPortal(
    <ModalContent {...props} />,
    document.querySelector("#modal")
  );
};

export default Modal;
