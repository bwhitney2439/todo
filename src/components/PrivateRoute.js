import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { TodoContext } from "../contexts/TodoContext";

const PrivateRoute = ({ children, ...rest }) => {
  const { authUser } = useContext(TodoContext);

  console.log(authUser);

  return (
    <Route
      {...rest}
      render={() => (!!authUser ? children : <Redirect to={"/login"} />)}
    />
  );
};
export default PrivateRoute;
