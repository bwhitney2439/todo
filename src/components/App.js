import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import * as ROUTES from "../constants/routes";
import Header from "./layout/Header";
import Home from "./layout/Home";
import "./App.css";
import { useAppState } from "../contexts";
import NavBar from "./layout/Header/NavBar";
import SignIn from "./layout/SignIn";

const App = () => {
  const { authUser } = useAppState();

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (!!authUser ? <Home /> : <Redirect to="/login" />)}
        />
        <Route path="/login">
          <SignIn />
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
