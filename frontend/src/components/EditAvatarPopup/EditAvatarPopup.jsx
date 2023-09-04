import { useRef } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  isProcess,
  onUpdateAvatar,
}) {
  const input = useRef();

  const { isValid, values, errors, isInputValid, handleChange, reset } =
    useFormValidation();

  function resetWhenClosing() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: input.current.value }, reset);
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={resetWhenClosing}
      isProcess={isProcess}
      onSubmit={handleSubmit}
      isValid={isValid}
      titleButton="Сохранить"
    >
      <div className="popup__input-container">
        <input
          name="avatar"
          id="link-avatar-input"
          type="url"
          placeholder="Ссылка на аватар"
          className={`popup__input popup__input_type_link ${
            isInputValid.avatar === undefined || isInputValid.avatar
              ? ""
              : "popup__input_type_error"
          }`}
          required
          ref={input}
          value={values.avatar ? values.avatar : ""}
          onChange={handleChange}
          disabled={isProcess}
        />
        <span className="link-avatar-input-error popup__text-error">
          {errors.avatar}
        </span>
      </div>
    </PopupWithForm>
  );
}
