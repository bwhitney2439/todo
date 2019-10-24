import React, { createContext, useState, useEffect } from "react";
import firebase from "../config/firebase";

export const AuthUserContext = createContext(undefined);

const AuthUserContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth.onAuthStateChanged(
      setAuthUser
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
