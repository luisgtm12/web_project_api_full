import trasIcon from "../images/trash-icon.png";
import likeIcon from "../images/corazon.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card({ card, id, onCardClick,onCardLike,onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  // Verificando si el usuario actual es el propietario de la tarjeta actual
  const isOwn = card.owner === currentUser._id;

  // Creando una variable que después establecerás en `className` para el botón eliminar
  const cardDeleteButtonClassName = `places-card__trash ${
    isOwn ? "places-card__trash_visible" : "places-card__trash_hidden"
  }`;
  // Verifica si el usuario actual le dio "like" a la tarjeta
  const isLiked = card.likes.some((i) => i === currentUser._id);

  // Crea una variable que después establecerás en `className` para el botón like
  const cardLikeButtonClassName = `places-card__contain_like ${
    isLiked ? "places-card__contain_like_active" : ""
  }`;

  function handleOnLikeClick(){
    onCardLike(card)
  }
  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  function handleOnCardClick() {
    onCardClick(card);
  }
  return (
    <>
      <div className="card">
        <div className="places-card" id={id}>
          <img
            src={trasIcon}
            id="tras-icon"
            className={cardDeleteButtonClassName}
            alt="tachito de basura"
            onClick={handleDeleteClick}
          />
          <img
            src={card.link}
            alt={`Photo de ${card.name}`}
            className="places-card__image"
            onClick={handleOnCardClick}
          />
          <div className="places-card__contain">
            <p className="places-card__contain_title">{card.name}</p>
            <div>
              <img
                src={likeIcon}
                id="likeButton"
                alt="icono de corazon"
                className={cardLikeButtonClassName}
                onClick={handleOnLikeClick}
              />
              <p className="places-card__contain_like-count">
                {card?.likes?.length || ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Card;