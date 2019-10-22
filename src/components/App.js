import React from "react";
import { withRouter, BrowserRouter as Router, Route } from "react-router-dom";
// import * as ROUTES from "../constants/routes";
import TodoContextProvider from '../contexts/TodoContext'
// import LandingPage from "../components/landingPage";
import { PrivateRoute } from "../Hooks";
import MyNavBar from "./myNavBar";
import Footer from './layout/Footer';
import Home from "./layout/Home";
import Login from './layout/Login';

const App = () => (
  <TodoContextProvider>

    <Router>
      <div>
        <MyNavBar />

        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
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
        <Footer />
      </div>
    </Router >
  </TodoContextProvider>
);

export default App;
