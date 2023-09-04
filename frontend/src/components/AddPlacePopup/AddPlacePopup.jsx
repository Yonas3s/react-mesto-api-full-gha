import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({
  isOpen,
  onClose,
  isProcess,
  onAddPlace,
}) {
  const { isValid, values, errors, isInputValid, handleChange, reset } =
    useFormValidation();

  function resetWhenClosing() {
    onClose();
    reset({ title: onAddPlace.title, link: onAddPlace.link });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ title: values.title, link: values.link }, reset);
  }

  return (
    <PopupWithForm
      name="cards"
      title="Новое место"
      titleButton="Создать"
      isOpen={isOpen}
      onClose={resetWhenClosing}
      isProcess={isProcess}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <div className="popup__input-container">
        <input
          type="text"
          name="title"
          id="title-input"
          className={`popup__input popup__input_type_title ${
            isInputValid.title === undefined || isInputValid.title
              ? ""
              : "popup__input_type_error"
          }`}
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required
          value={values.title ? values.title : ""}
          onChange={handleChange}
          disabled={isProcess}
        />
        <span className="title-input-error popup__text-error">
          {errors.title}
        </span>
        <input
          type="url"
          name="link"
          id="link-input"
          className={`popup__input popup__input_type_link ${
            isInputValid.link === undefined || isInputValid.link
              ? ""
              : "popup__input_type_error"
          }`}
          placeholder="Ссылка на картинку"
          required
          value={values.link ? values.link : ""}
          onChange={handleChange}
          disabled={isProcess}
        />
        <span className="link-input-error popup__text-error">
          {errors.link}
        </span>
      </div>
    </PopupWithForm>
  );
}
