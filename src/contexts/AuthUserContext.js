import React, { createContext, useState, useEffect } from "react";
import firebase from "../config/firebase";

export const AuthUserContext = createContext(undefined);

const AuthUserContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth.onAuthStateChanged(user => {
      if(user) {

        localStorage.setItem('authUser', JSON.stringify(user));
        setAuthUser(user);
      } else {
        localStorage.removeItem('authUser')
        setAuthUser(null)
      }
    }
      
    );

    return () => unregisterAuthObserver();
  }, []);

  return (
    <AuthUserContext.Provider value={authUser}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserContextProvider;
