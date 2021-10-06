import React from "react";
import { useHistory } from "react-router-dom";
import logo from "../images/logo.svg";
import HamburgerMenuIcon from "../images/hamburger_icon_white.svg";
import CloseMenuIcon from "../images/close-icon.svg";

function Header(props) {
  const history = useHistory();
  const [mobileWidth, setMobileWidth] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    function checkWidth() {
      const windowWidth = window.matchMedia("(max-width: 550px)");
      if (windowWidth.matches) {
        setMobileWidth(true);
      } else {
        setMobileWidth(false);
      }
    }
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  });

  function handleHamburgeMenuClick() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  function handleLinkClick(e) {
    e.preventDefault();
    props.setIsInfoTooltipPopupOpen(false);
    history.push(props.pageLink);
  }

  return (
    <header className={`header ${props.loggedIn && "header__mobile"}`}>
      <div className="header__logo-group">
        <img className="logo" src={logo} alt="logo" />
        {props.loggedIn && mobileWidth && (
          <img
            className={`${
              mobileWidth && isMobileMenuOpen
                ? "header__close-icon"
                : "header__hamburger-icon"
            }`}
            src={!isMobileMenuOpen ? HamburgerMenuIcon : CloseMenuIcon}
            alt=""
            onClick={handleHamburgeMenuClick}
          />
        )}
      </div>
      <div
        className={`header__info-group ${
          mobileWidth && props.loggedIn && "header__info-group_type_mobile"
        } ${
          mobileWidth && !isMobileMenuOpen && props.loggedIn && "mobile-menu"
        }`}
      >
        {props.loggedIn && <p className="header__email">{props.headerEmail}</p>}
        <button
          className={`header__link ${
            mobileWidth && props.loggedIn && "header__link_type_mobile"
          } ${
            props.loggedIn
              ? "header__link_type_grey"
              : "header__link_type_white"
          }`}
          onClick={props.loggedIn ? props.onLogoutSubmit : handleLinkClick}
        >
          {props.linkTitle}
        </button>
      </div>
    </header>
  );
}

export default Header;
