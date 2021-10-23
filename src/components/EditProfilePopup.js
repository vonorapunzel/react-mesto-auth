import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <>
      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        button="Создать"
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={handleSubmit}
      >
        <input
          className="popup__text popup__text_name_input"
          type="text"
          id="name-input"
          name="name"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleChangeName}
          required
        />
        <span
          className="popup__span popup__span_text-error"
          id="name-input-error"
        ></span>
        <input
          className="popup__text popup__text_whois_input"
          type="text"
          id="whois-input"
          name="about"
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleChangeDescription}
          required
        />
        <span
          className="popup__span popup__span_text-error"
          id="whois-input-error"
        ></span>
      </PopupWithForm>
    </>
  );
}

export default EditProfilePopup;
