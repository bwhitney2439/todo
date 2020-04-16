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
import Login from "./layout/Login";
import "./App.css";
import { useAppState } from "../contexts";

// import PrivateRoute from './PrivateRoute'
const App = () => {
  const { authUser } = useAppState();

  return (
    <Router>
      <div>
        <Header />
        <Switch>
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
  );
};
export default App;
