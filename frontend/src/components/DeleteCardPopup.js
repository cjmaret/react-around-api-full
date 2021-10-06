import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {

    function handleSubmit(e) {
        e.preventDefault();
        props.onRenderLoading();
        props.onDeleteCardSubmit(props.cardToDelete);
    }

    return (
        <PopupWithForm name="delete-card" title="Are you sure?" loadingText="Deleting..." buttonText="Yes" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isLoading={props.isLoading} >
        </PopupWithForm>
    );
}

export default DeleteCardPopup;