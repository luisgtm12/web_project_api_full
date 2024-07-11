import Profile from "./Profile";
import Card from "./Card.js";
import {  useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,onCardLike,
  onCardDelete,cards
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <main>
        <Profile
          onEditAvatarClick={onEditAvatarClick}
          onEditProfileClick={onEditProfileClick}
          onAddPlaceClick={onAddPlaceClick}
          currentUser={currentUser}
        ></Profile>
        <section className="places" id="places">
          {
            cards.map((card,i)=>(
              <Card 
              key={`card-${i}`}
              card={card}
              id={`card-${i}`}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              />
            ))
          }
          
        </section>
      </main>
    </>
  );
}

export default Main;