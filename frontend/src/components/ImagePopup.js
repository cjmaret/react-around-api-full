import React from 'react';

function ImagePopup(props) {

    React.useEffect(() => {

        function close(e) {
            if (e.key === 'Escape') {
                props.onClose();
            }
        };

        props.card && window.addEventListener('keydown', close);

        return () => window.removeEventListener('keydown', close);

}, [props]);

function handleClickOutside(e) {
    if (e.target.classList.contains('modal')) {
        e.preventDefault();
        props.onClose();
    }
}

    return (
        <div className={`modal image-expand ${props.card ? 'modal_open' : ''}`} onClick={handleClickOutside}>
            <div className="image-expand__container">
                <button className="modal__close-icon modal__close-icon_type_image" type="button"
                    aria-label="close button" onClick={props.onClose}></button>
                <div className="image-expand__info">
                    <img src={props.card?.link} className="image-expand__image" alt={props.card?.name} />
                    <h2 className="image-expand__title">{props.card?.name}</h2>
                </div>
            </div>
        </div>
    )
}

export default ImagePopup;