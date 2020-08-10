import React from "react";
import GradientBar from "./components/common/GradientBar";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

const AppShell = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default AppShell;
