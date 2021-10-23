import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
    setName("");
    setLink("");
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }
  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      button="Создать"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__text popup__text_title_input"
        type="text"
        id="title-input"
        name="name"
        minLength="2"
        maxLength="40"
        placeholder="Название"
        value={name}
        onChange={handleChangeName}
        required
      />
      <span
        className="popup__span popup__span_text-error"
        id="title-input-error"
      ></span>
      <input
        className="popup__text popup__text_link_input"
        type="url"
        id="link-input"
        name="link"
        minLength="2"
        maxLength="200"
        placeholder="Ссылка на картинку"
        value={link}
        onChange={handleChangeLink}
        required
      />
      <span
        className="popup__span popup__span_text-error"
        id="link-input-error"
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
