import React from "react";
import { GithubLoginButton } from "react-social-login-buttons";

const myNavBar = ({ user, signOut, signInWithGithub }) => {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-app">TODO App</div>
        <div>
          {user ? (
            <GithubLoginButton onClick={signOut}>
              <span>Sign out</span>
            </GithubLoginButton>
          ) : (
            <GithubLoginButton onClick={signInWithGithub}>
              <span>Sign in with Github</span>
            </GithubLoginButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default myNavBar;
