import statusOk from "../../images/statusOk.svg";
import statusError from "../../images/statusError.svg";

export default function InfoTooltip({ name, onClose, isOpen }) {
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="popup__container"
        onClick={(evt) => evt.stopPropagation()}
      >
        <img
          alt="status"
          className="popup__container-photo"
          src={`${name === "error" ? statusError : statusOk}`}
        />
        <p className="popup__container-text">
          {name === "error"
            ? "Что-то пошло не так! Попробуйте ещё раз."
            : "Вы успешно зарегистрировались!"}
        </p>
        <button type="button" className="popup__button-close" onClick={onClose} />
      </div>
    </div>
  );
}
