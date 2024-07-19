import { React, useState } from 'react'
import FormUser from "./FormUser";
import * as auth from '../utils/auth'
import { useNavigate } from 'react-router-dom'
import InfoTooltip from "./InfoTooltip";
import Header from "./Header";

function Register() {
  const navigate = useNavigate();

  // States
  const [successRegister, setSuccessRegister] = useState(false);
  const [shoulBeInfoOpen, setShouldBeInfoOpen] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  // funcion para Cerrar Tooltip
  function closeInfoTooltip() {
    setShouldBeInfoOpen(false);
  }
  // Funcion para guardar informacion del formulario
  function handleChange(event) {
    const { name, value } = event.target;
    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  }
  // Manipulacion del Submit del formulario
  function handleSubmit(event) {
    console.log('handlesubmit',userCredentials)
    event.preventDefault();
    auth
      .register(userCredentials.email, userCredentials.password)
      .then((data) => {
        if (data) {
          navigate("/signin", { state: "success" });
        } else {
          setShouldBeInfoOpen(true);
          setSuccessRegister(false);
        }
      });
  }
  return (
    <>
      <Header linkRoute={"/signin"} signText={"Inicia sesion"}/>
      <FormUser
        title={'Registro'}
        buttonText={"Registrate"}
        linkSpan={"/signin"}
        linkText={"¿Ya eres miembro? Inicia sesión aquí"}
        onChange={handleChange}
        onSubmit={handleSubmit}
      ></FormUser>
      <InfoTooltip
        isSuccess={successRegister}
        isOpen={shoulBeInfoOpen}
        name={"tooltip"}
        onClose={closeInfoTooltip}
      />
    </>
  );
}
export default Register;