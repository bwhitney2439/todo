import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
} from "react";
import firebase from "../config/firebase";
import { filterTodosReducer } from "../reducers/filterTodosReducer";
import { useTodos } from "../Hooks";

export const AppContext = createContext(undefined);

export const AppContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const [activeFilter, dispatchFilter] = useReducer(filterTodosReducer, "All");

  const {
    addTodo,
    todos,
    toggleTodo,
    toggleAllTodos,
    editTodo,
    deleteTodo,
    clearTodos,
  } = useTodos(authUser);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("authUser", JSON.stringify(user));
        setAuthUser(user);
      } else {
        localStorage.removeItem("authUser");
        setAuthUser(null);
      }
    });

    return () => unregisterAuthObserver();
  }, []);

  return (
    <AppContext.Provider
      value={{
        firebase,
        authUser,
        addTodo,
        todos,
        toggleTodo,
        toggleAllTodos,
        editTodo,
        deleteTodo,
        clearTodos,
        activeFilter,
        dispatchFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => useContext(AppContext);
