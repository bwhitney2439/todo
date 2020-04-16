import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
// import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { AppContextProvider } from "./contexts";
// import { AuthUserContextProvider } from "./contexts";
ReactDOM.render(
  <AppContextProvider>
    {/* <TodoContextProvider> */}
    {/* <AuthUserContextProvider> */}
    <App />
    {/* </AuthUserContextProvider> */}
    {/* </TodoContextProvider> */}
  </AppContextProvider>,
  document.querySelector("#root")
);
