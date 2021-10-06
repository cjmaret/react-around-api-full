import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState();
    const [description, setDescription] = React.useState();

    React.useEffect(() => {
        setName(currentUser?.name);
        setDescription(currentUser?.about)
    }, [currentUser, props.isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }
    

    function handleSubmit(e) {
        e.preventDefault();
        props.onRenderLoading();
        props.onUpdateUser({
            name,
            about: description,
        });
    }


    return (
        <PopupWithForm name="edit" title="Edit profile" loadingText="Saving..." buttonText="Save changes" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isLoading={props.isLoading}>
            <div className="edit-box__inputs">
                <div className="edit-box__input-group">
                    <input value={name || ''} id="title-input" className="edit-box__input edit-box__input_type_title" type="text"
                        name="username" placeholder="Name" minLength="2" maxLength="40" onChange={handleNameChange} required />
                    <span id="title-input-error" className="edit-box__input-error"></span>
                </div>
                <div className="edit-box__input-group">
                    <input value={description || ''} id="subtitle-input" className="edit-box__input edit-box__input_type_description" type="text"
                        name="userdescription" placeholder="Description" minLength="2" maxLength="200" onChange={handleDescriptionChange} required />
                    <span id="subtitle-input-error" className="edit-box__input-error"></span>
                </div>
            </div>
        </PopupWithForm>
    );
}

export default EditProfilePopup;