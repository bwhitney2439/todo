import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthState } from "../constants";

const PrivateRoute = ({ children, ...rest }) => {
  const authUser = useAuthState();

  return (
    <Route
      {...rest}
      render={() => (!!authUser ? children : <Redirect to={"/login"} />)}
    />
  );
};
export default PrivateRoute;
