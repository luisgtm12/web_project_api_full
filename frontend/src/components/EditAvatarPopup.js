import React, { useContext, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = useContext(CurrentUserContext);
  const avatarRef = useRef(currentUser?.avatar ?? "");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  function isUrlValid(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const avatar = avatarRef.current.value;
    if (isUrlValid(avatar)) {
      onUpdateAvatar({ avatar:avatar });
    }
  }

  function handleInputChange() {
    const avatar = avatarRef.current.value;
    if (!isUrlValid(avatar)) {
      setErrorMessage("Por favor ingresa una URL válida.");
    } else {
      setErrorMessage("");
    }
    setIsButtonDisabled(!isUrlValid(avatar));
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={"avatar"}
      title={"Foto de perfil"}
      onClose={onClose}
    >
      <form id="form-edit-photo" className="form" onSubmit={handleSubmit} noValidate>
        <input
          className="form__user-box"
          id="edit-photo-avatar"
          type="url"
          placeholder="Url para imagen de perfil"
          name="link"
          ref={avatarRef}
          required
          onChange={handleInputChange}
        />
        <span className="edit-photo-avatar-error">{errorMessage}</span>
        <button type="submit" className="form__button-submit" disabled={isButtonDisabled}>
          Guardar
        </button>
      </form>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;