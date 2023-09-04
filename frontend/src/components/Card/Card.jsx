import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import CardLikeButton from "../CardLikeButton/CardLikeButton";

export default function Card({ card, onCardClick, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <li className="card">
      {currentUser._id === card.owner && (
        <button
          type="button"
          className="card__trash"
          onClick={() => onCardDelete(card._id)}
        />
      )}
      <img
        src={card.link}
        alt={card.name}
        className="card__photo"
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className="card__caption">
        <h3 className="card__caption-title">{card.name}</h3>
        <div className="card__like-block">
          <CardLikeButton
            likes={card.likes}
            myid={currentUser._id}
            cardid={card._id}
          />
        </div>
      </div>
    </li>
  );
}
