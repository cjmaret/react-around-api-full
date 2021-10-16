import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__details">
          <div className="profile__image-group">
            <button
              className="profile__image-overlay"
              type="button"
              aria-label="profile image edit button"
              onClick={props.onEditAvatarClick}
            ></button>
            <img
              className="profile__image"
              src={currentUser?.avatar}
              alt="profile"
            />
          </div>
          <div className="profile__info">
            <div className="profile__line-top">
              <h1 className="profile__title">{currentUser?.name}</h1>
              <button
                className="profile__button-edit"
                type="button"
                aria-label="edit button"
                onClick={props.onEditProfileClick}
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser?.about}</p>
          </div>
        </div>
        <button
          className="profile__button-add"
          type="button"
          aria-label="add button"
          onClick={props.onAddPlaceClick}
        ></button>
      </section>

      <section className="image-grid">
        {props.cards.map((card) => {
          return (
            <Card
              key={card._id}
              name={card.name}
              id={card._id}
              link={card.link}
              likes={card.likes?.length}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onDeleteCardClick={props.onDeleteCardClick}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
