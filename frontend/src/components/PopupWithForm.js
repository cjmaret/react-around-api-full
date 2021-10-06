import React from "react";

function PopupWithForm(props) {
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
      className={`modal modal_type_${props.name} ${
        props.isOpen ? "modal_open" : ""
      }`}
      onClick={handleClickOutside}
    >
      <div className="modal__container">
        <button
          className={`modal__close-icon modal__close-icon_type_${props.name}`}
          type="button"
          aria-label="close button"
          onClick={props.onClose}
        ></button>
        <form
          className={`edit-box edit-box_type_${props.name}`}
          name={`form-${props.name}`}
          onSubmit={props.onSubmit}
        >
          <h2 className="edit-box__title">{props.title}</h2>
          {props.children}
          <button
            className="edit-box__button edit-box__button_edit"
            type="submit"
            aria-label="save button"
            data-textcontent="Save"
          >
            {props.isLoading ? props.loadingText : props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
