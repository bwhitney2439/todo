import React, { createContext, useReducer, useState, useEffect } from "react";
import { withRouter } from 'react-router-dom'
import { filterTodosReducer } from "../reducers/filterTodosReducer";
import firebase from "../config/firebase";
export const TodoContext = createContext();

const TodoContextProvider = ({ history, children }) => {
  const [activeFilter, dispatchFilter] = useReducer(filterTodosReducer, "All");
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    firebase.auth.onAuthStateChanged(user => {
      setAuthUser(user)

      if (authUser != null) {
        history.push("/")
      }
    });

  }, []);


  return (
    <TodoContext.Provider
      value={{
        firebase,
        authUser,
        activeFilter,
        dispatchFilter
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default withRouter(TodoContextProvider);
