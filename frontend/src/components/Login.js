import React from "react";
import Header from "./Header";
import AuthorizationForm from "./AuthorizationForm";

function Login(props) {
  return (
    <>
      <Header
        linkTitle="Sign up"
        pageLink="./register"
        setIsInfoTooltipPopupOpen={props.setIsInfoTooltipPopupOpen}
      />
      <AuthorizationForm
        title="Log in"
        buttonTitle="Log in"
        pageLink="./register"
        pageLinkTitle="Not a member yet? Sign up here!"
        email={props.email}
        password={props.password}
        onEmailChange={props.onEmailChange}
        onPasswordChange={props.onPasswordChange}
        onAuthorizationSubmit={props.onLoginSubmit}
      />
    </>
  );
}

export default Login;
