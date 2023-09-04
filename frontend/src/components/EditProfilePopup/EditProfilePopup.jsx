import { useContext, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfilePopup({
  isOpen,
  onClose,
  isProcess,
  onUpdateUser,
}) {
  const currentUser = useContext(CurrentUserContext);
  const {
    isValid,
    values,
    errors,
    isInputValid,
    handleChange,
    reset,
    setValue,
  } = useFormValidation();

  useEffect(() => {
    setValue("name", currentUser.name);
    setValue("about", currentUser.about);
  }, [currentUser, setValue]);

  function resetWhenClosing() {
    onClose();
    reset({ name: currentUser.name, about: currentUser.about });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name: values.name, about: values.about }, reset);
  }

  return (
    <PopupWithForm
      name="profile"
      titleButton="Сохранить"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={resetWhenClosing}
      isProcess={isProcess}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          type="text"
          name="name"
          id="name-input"
          className={`popup__input popup__input_type_name ${
            isInputValid.name === undefined || isInputValid.name
              ? ""
              : "popup__input_type_error"
          }`}
          placeholder="Жак-Ив Кусто"
          minLength={2}
          maxLength={40}
          required
          value={values.name ? values.name : ""}
          onChange={handleChange}
          disabled={isProcess}
        />
        <span id="text-error" className="name-input-error popup__text-error">
          {errors.name}
        </span>
        <input
          type="text"
          name="about"
          id="job-input"
          className={`popup__input popup__input_type_job ${
            isInputValid.about === undefined || isInputValid.about
              ? ""
              : "popup__input_type_error"
          }`}
          placeholder="Исследователь океана"
          minLength={2}
          maxLength={200}
          required
          value={values.about ? values.about : ""}
          onChange={handleChange}
          disabled={isProcess}
        />
        <span className="job-input-error popup__text-error">
          {errors.about}
        </span>
      </div>
    </PopupWithForm>
  );
}
