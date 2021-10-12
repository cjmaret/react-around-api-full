import React from "react";
import Header from "./Header";
import AuthorizationForm from "./AuthorizationForm";

function Login(props) {
  return (
    <>
      <Header
        linkTitle="Sign up"
        pageLink="./signup"
        setIsInfoTooltipPopupOpen={props.setIsInfoTooltipPopupOpen}
      />
      <AuthorizationForm
        title="Log in"
        buttonTitle="Log in"
        pageLink="./signup"
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
