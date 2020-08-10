import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const SignOut = () => {
  const { logout } = useAuth0();

  logout();
};

export default SignOut;
