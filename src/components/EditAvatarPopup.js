import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar }) {
  const avatarRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="profile-image"
      title="Обновить аватар"
      button="Сохранить"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__text popup__text_link_input"
        type="url"
        id="avatar-input"
        name="avatar"
        minLength="2"
        maxLength="200"
        placeholder="Ссылка на картинку"
        ref={avatarRef}
        required
      />
      <span
        className="popup__span popup__span_text-error"
        id="avatar-input-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
