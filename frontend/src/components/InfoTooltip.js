import React from "react";
import ImageSuccess from "../images/image-success.svg";
import ImageFailure from "../images/image-failure.svg";

function InfoTooltip(props) {
  React.useEffect(() => {
    function close(e) {
      if (e.key === "Escape") {
        props.onClose();
      }
    }
    props.isOpen && window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [props]);

  function handleClickOutside(e) {
    if (e.target.classList.contains("modal")) {
      e.preventDefault();
      props.onClose();
    }
  }

  return (
    <div
      className={`modal modal_type_info-tooltip ${
        props.isOpen ? "modal_open" : ""
      }`}
      onClick={handleClickOutside}
    >
      <div className="modal__container modal__container_type_info-tooltip">
        <button
          className="modal__close-icon modal__close-icon_type_info-tooltip"
          type="button"
          aria-label="close button"
          onClick={props.onClose}
        ></button>
        <div className="info-tooltip">
          <img
            className="info-tooltip__image"
            src={props.isSuccess ? ImageSuccess : ImageFailure}
            alt=""
          />
          <h2 className="info-tooltip__title">
            {props.isSuccess
              ? "Success! You have now been registered."
              : "Oops, something went wrong! Please try again."}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
