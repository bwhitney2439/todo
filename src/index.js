import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import { AppContextProvider } from "./contexts";
ReactDOM.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>,
  document.querySelector("#root")
);
