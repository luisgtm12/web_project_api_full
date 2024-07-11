import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [nameError, setNameError] = useState("");
  const [linkError, setLinkError] = useState("");

  function isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    if (!name) {
      setNameError("Por favor ingresa un título.");
      return;
    }

    if (name.length < 2) {
      setNameError("El título debe tener al menos 2 caracteres.");
      return;
    }

    if (!link) {
      setLinkError("Por favor ingresa un enlace.");
      return;
    }

    if (link.length < 2) {
      setLinkError("El enlace debe tener al menos 2 caracteres.");
      return;
    }

    if (!isValidURL(link)) {
      setLinkError("Por favor ingresa una URL válida.");
      return;
    }

    // Si todos los campos son válidos, llama a la función onAddPlace
    onAddPlace({ name, link });
  }

  function handleOnChange(evt) {
    const { name, value } = evt.target;
    if (name === "name") {
      setName(value);
      setNameError("");
    } else {
      setLink(value);
      setLinkError("");
    }
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={"place"}
      title={"Nuevo Lugar"}
      onClose={onClose}
    >
      <form
        id="form-place"
        className="form"
        onSubmit={handleAddPlaceSubmit}
        noValidate
      >
        <input
          className="form__user-box"
          id="place-title"
          type="text"
          placeholder="Título"
          minLength="2"
          maxLength="30"
          name="name"
          value={name}
          onChange={handleOnChange}
          required
        />
        <span className="place-title-error">{nameError}</span>
        <input
          className="form__user-box"
          id="place-link"
          type="url"
          placeholder="Enlace a la imagen"
          name="link"
          value={link}
          onChange={handleOnChange}
          required
        />
        <span className="place-link-error">{linkError}</span>
        <button
          type="submit"
          className="form__button-submit"
          disabled={!!nameError || !!linkError}
        >
          Crear
        </button>
      </form>
    </PopupWithForm>
  );
}

export default AddPlacePopup;