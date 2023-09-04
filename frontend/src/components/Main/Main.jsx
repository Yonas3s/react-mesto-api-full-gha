import { useContext } from "react";
import Card from "../Card/Card";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="container">
      <section className="profile">
        <button className="profile__button-avatar" onClick={onEditAvatar}>
          <img
            className="profile__avatar"
            src={currentUser.avatar ? currentUser.avatar : "#"}
            alt="аватар"
          />
        </button>
        <h1 className="profile__person-name">
          {currentUser.name ? currentUser.name : ""}
        </h1>
        <button
          type="button"
          className="profile__button-edit"
          onClick={onEditProfile}
        />
        <button
          type="button"
          className="profile__button-add"
          onClick={onAddPlace}
        >
          +
        </button>
        <p className="profile__person-job">
          {currentUser.about ? currentUser.about : ""}
        </p>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
