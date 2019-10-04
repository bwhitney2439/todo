import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "../constants/routes";

import LandingPage from "../components/landingPage";

const App = () => (
  <Router>
    <div>
      <NavBar />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage}></Route>
      <Route path={ROUTES.SIGN_UP} component={SignUpPage}></Route>
      <Route path={ROUTES.SIGN_IN} component={SignInPage}></Route>
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      ></Route>
      <Route path={ROUTES.HOME} component={HomePage}></Route>
      <Route path={ROUTES.ACCOUNT} component={AccountPage}></Route>
      <Route path={ROUTES.ADMIN} component={AdminPage}></Route>
    </div>
  </Router>
);

export default App;
