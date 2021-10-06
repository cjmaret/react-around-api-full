import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card?.owner._id === currentUser?._id;
    const cardDeleteButtonClassName = (
        `image-card__trash ${isOwn ? 'image-card__trash_visible' : 'image-card__trash_hidden'}`);
    const isLiked = props.card?.likes.some(i => i._id === currentUser?._id);
    const cardLikeButtonClassName = (
        `image-card__heart ${isLiked ? 'image-card__heart_liked': ''}`);

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onDeleteCardClick(props.card);
    }


    return (
        <div className="image-card">
            <button className={cardDeleteButtonClassName} type="button" aria-label="trash button" onClick={handleDeleteClick}></button>
            <img className="image-card__image" src={props.link} alt={props.name} onClick={handleClick} />
            <div className="image-card__text">
                <h2 className="image-card__title">{props.name}</h2>
                <div className="image-card__heart-group">
                    <button className={cardLikeButtonClassName} aria-label="Like button" type="button" onClick={handleLikeClick}></button>
                    <p className="image-card__heart-number">{props.likes}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;