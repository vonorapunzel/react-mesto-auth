import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__trash ${
    isOwn ? "element__trash" : "element__trash_hidden"
  }`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    !isLiked ? "element__like" : "element__like_active"
  }`;
  return (
    <article className="element">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
      ></button>
      <img
        className="element__image"
        onClick={handleClick}
        src={card.link}
        alt={card.name}
      />
      <div className="element__signature">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <p className="element__counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
