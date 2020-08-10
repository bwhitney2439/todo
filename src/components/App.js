import React, { Suspense } from "react";
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
import SignIn from "./SignInold";
// import SignIn from "./layout/SignIn";
import { Typography, Paper } from "@material-ui/core";
import SignInSide from "./layout/SignIn";
import FourOFour from "./layout/FourOFour";
import { AuthCheck, useAuth } from "reactfire";

const UnauthenticatedRoutes = () => (
  <Switch>
    <Suspense fallback={<h1 variant="h1">Loading...</h1>}>
      <Route exact path="/">
        <SignInSide />
      </Route>
      {/* <Route path="*">
      <FourOFour />
    </Route> */}
    </Suspense>
  </Switch>
);

const AuthenticatedRoute = ({ children, ...rest }) => {
  // const { authUser } = useAppState();
  const auth = useAuth();

  console.log(auth);

  return (
    <Suspense fallback={<h1 variant="h1">Loading...</h1>}>
      <Route
        {...rest}
        render={() => (auth ? <>{children}</> : <Redirect to="/" />)}
      ></Route>
    </Suspense>
  );
};

const AppRoutes = () => {
  return (
    <>
      <Switch>
        <Suspense fallback={<h1 variant="h1">Loading...</h1>}>
          <AuthCheck fallback={<SignInSide />}>
            <Home />
          </AuthCheck>
          {/* <UnauthenticatedRoutes /> */}
        </Suspense>
      </Switch>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
export default App;
