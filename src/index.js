import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import TodoContextProvider from "./contexts/TodoContext";
ReactDOM.render(
  <TodoContextProvider>
    <App />
  </TodoContextProvider>,
  document.querySelector("#root")
);
