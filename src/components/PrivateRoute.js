import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthUserContext } from '../contexts/AuthUserContext'

const PrivateRoute = ({ children, ...rest }) => {
  const authUser = useContext(AuthUserContext);


  return (
    <Route
      {...rest}
      render={() => (!!authUser ? children : <Redirect to={"/login"} />)}
    />
  );
};
export default PrivateRoute;
