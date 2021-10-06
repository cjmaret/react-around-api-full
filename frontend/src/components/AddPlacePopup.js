import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

    const [name, setName] = React.useState();
    const [link, setLink] = React.useState();


    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handleLinkChange(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onRenderLoading();
        props.onAddPlaceSubmit({
            name,
            link
        });
        setName('');
        setLink('');
    }



    return (
        <PopupWithForm name="add" title="New place" loadingText="Creating..." buttonText="Create" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isLoading={props.isLoading}>
            <div className="edit-box__inputs">
                <div className="edit-box__input-group">
                    <input value={name || ''} id="image-title-input" className="edit-box__input edit-box__input_type_image-title"
                        type="text" name="name" placeholder="Title" minLength="1" maxLength="30" onChange={handleNameChange} required />
                    <span id="image-title-input-error" className="edit-box__input-error"></span>
                </div>
                <div className="edit-box__input-group">
                    <input value={link || ''} id="image-link-input" className="edit-box__input edit-box__input_type_image-link" type="url"
                        name="link" placeholder="Image link" onChange={handleLinkChange} required />
                    <span id="image-link-input-error" className="edit-box__input-error"></span>
                </div>
            </div>
        </PopupWithForm>
    );
}

export default AddPlacePopup;