import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import TodoContextProvider from "./contexts/TodoContext";
import AuthUserContextProvider from "./contexts/AuthUserContext";
ReactDOM.render(
  <TodoContextProvider>
    <AuthUserContextProvider>
      <App />
    </AuthUserContextProvider>
  </TodoContextProvider>,
  document.querySelector("#root")
);
