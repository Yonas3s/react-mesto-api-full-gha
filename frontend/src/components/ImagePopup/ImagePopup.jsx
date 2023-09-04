export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <section
      id="view-card"
      className={`popup popup-view ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div className="popup__page" onClick={(evt) => evt.stopPropagation()}>
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        />
        <img
          src={card.link ? card.link : "#"}
          alt={card.name ? card.name : "#"}
          className="popup__photo"
        />
        <h2 className="popup__description">{card.name}</h2>
      </div>
    </section>
  );
}
