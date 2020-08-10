import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import { AppContextProvider } from "./contexts";
import firebaseConfig from "./config/config";
import { FirebaseAppProvider } from "reactfire";

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </FirebaseAppProvider>,
  document.querySelector("#root")
);
