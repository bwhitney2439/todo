import React, { createContext, useReducer } from "react";
import { filterTodosReducer } from "../reducers/filterTodosReducer";
import firebase from "../config/firebase";
import UseAuth from "../components/auth/UseAuth";

export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const [activeFilter, dispatchFilter] = useReducer(filterTodosReducer, "All");
  // const [authUser, setAuthUser] = useState();

  // useEffect(() => {
  //   firebase.auth.onAuthStateChanged(user => {
  //     setAuthUser(user);
  //   });

  //   // return () => unregisterAuthObserver();
  // }, []);

  const authUser = UseAuth();

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

export default TodoContextProvider;
