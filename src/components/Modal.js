import React from "react";
import ReactDOM from "react-dom";
import ModalInner from "./ModalInner";

const Modal = props => {
  return ReactDOM.createPortal(
    <ModalInner {...props} />,
    document.querySelector("#modal") //target DOM element
  );
};

export default Modal;
