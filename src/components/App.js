import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
// import * as ROUTES from "../constants/routes";
import MyNavBar from "./myNavBar";
import Home from "./layout/Home";
import Login from "./layout/Login";
import "../index.css";
import firebase from "../config/firebase";
import AuthUserContext from "../contexts/AuthUserContext";

const App = () => {
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth.onAuthStateChanged(
      setAuthUser
    );

    return () => unregisterAuthObserver();
  }, []);

  console.log(authUser);
  return (
    <AuthUserContext.Provider value={authUser}>
      <Router>
        <div>
          <MyNavBar />
          <Switch>
            {/* <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute> */}
            <Route
              exact
              path="/"
              render={() => (!!authUser ? <Home /> : <Redirect to="/login" />)}
            />
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthUserContext.Provider>
  );
};
export default App;
