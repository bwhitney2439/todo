import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import * as ROUTES from "../constants/routes";
import TodoContextProvider from "../contexts/TodoContext";
// import LandingPage from "../components/landingPage";
import PrivateRoute from "./PrivateRoute";
import MyNavBar from "./myNavBar";
import Home from "./layout/Home";
import Login from "./layout/Login";
import "../index.css";

const App = () => (
  <TodoContextProvider>
    <Router>
      <div>
        <MyNavBar />
        <Switch>
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          {/* //   {/* <Route exact path={ROUTES.LANDING} component={LandingPage}></Route>
        // <Route path={ROUTES.SIGN_UP} component={SignUpPage}></Route>
        // <Route path={ROUTES.SIGN_IN} component={SignInPage}></Route>
        // <Route
        //   path={ROUTES.PASSWORD_FORGET}
        //   component={PasswordForgetPage}
        // ></Route>
        // <Route path={ROUTES.HOME} component={HomePage}></Route>
        // <Route path={ROUTES.ACCOUNT} component={AccountPage}></Route>
      // <Route path={ROUTES.ADMIN} component={AdminPage}></Route> */}
        </Switch>
      </div>
    </Router>
  </TodoContextProvider>
);

export default App;
