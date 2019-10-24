import React from "react";
import SignIn from "../../SignIn";
import { FaRegListAlt } from "react-icons/fa";
import "./index.css";

const Header = () => (
  <header>
    <div className="navbar-container">
      <div className="navbar">
        <FaRegListAlt size="30px" />
        <SignIn />
      </div>
    </div>
  </header>
);

export default Header;
