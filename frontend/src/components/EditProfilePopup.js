import { useState,useContext,useEffect } from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext"
import PopupWithForm from "./PopupWithForm";
function EditProfilePopup({isOpen,onClose,onUpdateUser}) {

  const currentUser = useContext(CurrentUserContext);
  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");


  useEffect(() => {
    // Reviso que el usuario en el contexto no sea `undefined`
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  useEffect(() => {
    // Verificar si los campos de entrada están vacíos o no
    setIsSaveButtonDisabled(!name || !description || name.length < 2 || description.length < 2);
  }, [name, description]);

  function handleOnChange(evt) {
    const { name, value } = evt.target;
    if (name === "name") {
      setName(value);
      if (value.length < 2) {
        setNameError("El nombre debe tener al menos 2 caracteres");
      } else {
        setNameError("");
      }
    } else {
      setDescription(value);
      if (value.length < 2) {
        setDescriptionError("La descripción debe tener al menos 2 caracteres");
      } else {
        setDescriptionError("");
      }
    }
  }

  function handleSubmit(e) {
    // Evita que el navegador navegue hacia la dirección del formulario
    e.preventDefault();
    
    // Limpiando los inputs
    setName("");
    setDescription("");
    
    // Pasa los valores de los componentes gestionados al controlador externo
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={"profile"}
      title={"Editar perfil"}
      onClose={onClose}
    >
      <form id="form-profile" className="form" onSubmit={handleSubmit} noValidate>
        <input
          onChange={handleOnChange}
          className="form__user-box"
          id="user-name"
          type="text"
          placeholder="Nombre"
          minLength="2"
          maxLength="40"
          name="name"
          value={name}
          required
        />
        <span className="user-name-error">{nameError}</span>
        <input
          onChange={handleOnChange}
          className="form__user-box"
          id="user-about"
          type="text"
          placeholder="Acerca de mi"
          minLength="2"
          maxLength="200"
          name="about"
          value={description}
          required
        />
        <span className="user-about-error">{descriptionError}</span>
        <button type="submit" className="form__button-submit" disabled={isSaveButtonDisabled}>
          Guardar
        </button>
      </form>
    </PopupWithForm>
  );
}

export default EditProfilePopup;