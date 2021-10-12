import React from "react";
import Header from "./Header";
import AuthorizationForm from "./AuthorizationForm";

function Register(props) {
  return (
    <>
      <Header
        linkTitle="Log in"
        pageLink="./signin"
        setIsInfoTooltipPopupOpen={props.setIsInfoTooltipPopupOpen}
      />
      <AuthorizationForm
        title="Sign up"
        buttonTitle="Sign up"
        pageLink="./signin"
        pageLinkTitle="Already a member? Log in here!"
        email={props.email}
        password={props.password}
        onEmailChange={props.onEmailChange}
        onPasswordChange={props.onPasswordChange}
        onAuthorizationSubmit={props.onRegisterSubmit}
      />
    </>
  );
}

export default Register;
