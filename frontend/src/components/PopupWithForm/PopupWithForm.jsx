export default function PopupWithForm({
  name,
  title,
  titleButton,
  children,
  isOpen,
  onClose,
  onSubmit,
  isProcess,
  isValid = true,
}) {
  return (
    <div
      id={name}
      className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="popup__container"
        onClick={(evt) => evt.stopPropagation()}
      >
        <h2
          className={`popup__title ${
            name === "delete" && "popup__title_delete"
          }`}
        >
          {title}
        </h2>
        <form
          name={name}
          className="popup__form"
          id={`popup_form-${name}`}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className={`popup__btn-form popup__btn-form_type_save ${
              isValid ? "" : "popup__btn-form_inactive"
            }`}
            disabled={isProcess}
          >
            {isProcess ? titleButton + "..." : titleButton}
          </button>
          <button
            type="button"
            className="popup__button-close"
            onClick={onClose}
          />
        </form>
      </div>
    </div>
  );
}
