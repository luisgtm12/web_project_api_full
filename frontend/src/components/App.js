import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useState, useEffect } from "react";
import Register from "./Register.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import ImagePopup from "./ImagePopup.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute";
import *as auth from "../utils/auth"

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectCard, setSelectCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.getCards().then((cards) => {
      setCards(cards);
    });
  }, []);

  useEffect(() => {
    api.defaultProfile().then((res) => {
      setCurrentUser(res);
    });
  }, []);


  useEffect(()=>{
    if(localStorage.getItem('jwt')){
      auth 
        .getToken(localStorage.getItem('jwt'))
        .then((data)=>{
            if(data){
              setIsLogged(true);
              setEmailUser(data.email);
              navigate('/')
            } else{
              navigate('/signup')
              throw new Error('Token invalido')
            }
        })
        .catch((error)=>{
          console.log(error);
          navigate('/signup')
        })
    }
  },[isLogged, navigate]);

  function signOff(){
    localStorage.removeItem('jwt')
    setEmailUser("")    
  }

  function handleLogin(){
    setIsLogged(true)
  }


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closePopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectCard(null);
  }

  function handleCardClick(card) {
    setSelectCard(card);
  }

  function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya le han dado like
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      api.deleteLike(card._id).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    } else {
      api.addLike(card._id).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then((res) => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  function handleUpdateUser(data) {
    api.updateProfile(data).then(() => {
      setCurrentUser({ ...currentUser, ...data });
      setIsEditProfilePopupOpen(false);
    });
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data).then((userData) => {
      setCurrentUser(userData);
      setIsEditAvatarPopupOpen(false);
    });
  }

  function handleAddPlaceSubmit(card) {
    api.addCards(card).then((newCard) => {
      setCards([newCard, ...cards]);
      setIsAddPlacePopupOpen(false);
    });
  }

  return (
    <>
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route element={<ProtectedRoute loggedIn={isLogged} />}>
              <Route
                path="/"
                element={
                  <>
                    <Header 
                      signText={"Cerrar sesión"}
                      email={emailUser}
                      onClick={signOff}
                      linkRoute={'/signin'}
                    />
                    <Main
                      onEditAvatarClick={handleEditAvatarClick}
                      onEditProfileClick={handleEditProfileClick}
                      onAddPlaceClick={handleAddPlaceClick}
                      isOpen={[
                        isEditProfilePopupOpen,
                        isAddPlacePopupOpen,
                        isEditAvatarPopupOpen,
                      ]}
                      onClose={closePopups}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                      cards={cards}
                    />
                    <EditAvatarPopup
                      isOpen={isEditAvatarPopupOpen}
                      onClose={closePopups}
                      onUpdateAvatar={handleUpdateAvatar}
                    />
                    <EditProfilePopup
                      isOpen={isEditProfilePopupOpen}
                      onClose={closePopups}
                      onUpdateUser={handleUpdateUser}
                    />
                    <AddPlacePopup
                      isOpen={isAddPlacePopupOpen}
                      onClose={closePopups}
                      onAddPlace={handleAddPlaceSubmit}
                    />
                    <ImagePopup
                      title={selectCard?.name || ""}
                      image={selectCard?.link || ""}
                      isOpen={!!selectCard}
                      onclose={closePopups}
                    />
                  </>
                }
              />
            </Route>
            <Route
              path="/signin"
              element={
                <>
                  <Login
                    isUserLogged={handleLogin}
                  />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <Register/>
                </>
              }
              />
          </Routes>
        </CurrentUserContext.Provider>
      </div>
      <Footer />
    </>
  );
}

export default App;
