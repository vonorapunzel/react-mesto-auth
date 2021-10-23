function PopupWithForm({
  name,
  title,
  button,
  onClose,
  isOpen,
  children,
  onSubmit,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className={`popup__exit popup__exit_exit-${name}`}
          onClick={onClose}
          type="button"
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={`${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__button popup__button-create" type="submit">
            {button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
