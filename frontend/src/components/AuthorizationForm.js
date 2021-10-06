import React from "react";
import { Link, withRouter } from "react-router-dom";

function AuthorizationForm(props) {

  return (
    <form className="auth-container" onSubmit={props.onAuthorizationSubmit}>
      <div className="auth-container__upper-flex-container">
        <h2 className="auth-container__title">{props.title}</h2>
        <div className="auth-container__inputs">
          <div className="auth-container__input-group">
            <input
              type="text"
              name="email"
              value={props.email}
              id="auth-container__email-input"
              className="auth-container__input"
              placeholder="Email"
              onChange={props.onEmailChange}
            />
            <span
              id="auth-container__email-input-error"
              className="auth-container__input-error"
            ></span>
          </div>
          <div className="auth-container__input-group">
            <input
              type="password"
              name="password"
              value={props.password}
              id="auth-container__password-input"
              className="auth-container__input"
              placeholder="Password"
              onChange={props.onPasswordChange}
            />
            <span
              id="auth-container__password-input-error"
              className="auth-container__input-error"
            ></span>
          </div>
        </div>
      </div>
      <div className="auth-container__lower-flex-container">
        <button
          type="submit"
          className="auth-container__submit-button"
        >
          {props.buttonTitle}
        </button>
        <Link to={props.pageLink} className="auth-container__switch-link">
          {props.pageLinkTitle}
        </Link>
      </div>
    </form>
  );
}

export default withRouter(AuthorizationForm);
