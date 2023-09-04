import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function CardLikeButton({ likes, myid, cardid }) {
  const [isLike, setIsLike] = useState(false);
  const [count, setCount] = useState(likes.length);

  useEffect(() => {
    setIsLike(likes.some(element => myid === element));
  }, [likes, myid]);

  function handleCardLike() {
    if (isLike) {
      api
        .removeLike(cardid, localStorage.jwt)
        .then((res) => {
          setIsLike(false);
          setCount(res.likes.length);
        })
        .catch((err) => console.log(err));
    } else {
      api
        .sendLike(cardid, localStorage.jwt)
        .then((res) => {
          setIsLike(true);
          setCount(res.likes.length);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <button
        type="button"
        className={`card__caption-like ${
          isLike ? "card__caption-like_active" : ""
        }`}
        onClick={handleCardLike}
      />
      <p className="card__quantity-like">{count}</p>
    </>
  );
}
