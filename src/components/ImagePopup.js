function ImagePopup({ card, onClose }) {
  return (
    <>
      <div
        className={`popup popup_image-open ${
          card.link === "" ? "" : "popup_opened"
        }`}
      >
        <div className="popup__container-image">
          <button
            className="popup__exit popup__exit_exit-image"
            onClick={onClose}
            type="button"
          ></button>
          <img
            className="popup__image popup__image_image-card"
            src={card.link}
            alt={card.name}
          />
          <h2 className="popup__title-image popup__title-image_title-card">
            {card.name}
          </h2>
        </div>
      </div>
    </>
  );
}

export default ImagePopup;
