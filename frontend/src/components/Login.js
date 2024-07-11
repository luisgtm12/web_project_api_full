import React,{useEffect, useState} from 'react'
import FormUser from "./FormUser";
import Header from "./Header";
import InfoTooltip from './InfoTooltip'
import { useLocation, useNavigate } from 'react-router-dom'
import *as auth from '../utils/auth'

function Login({isUserLogged}) {
  const navigate = useNavigate();
  const location = useLocation();

  // States
  const[successRegister, setSuccessRegister] = useState(false)
  const[shoulBeInfoOpen, setShouldBeInfoOpen] = useState(false)
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  // funcion para Cerrar Tooltip
  function closeInfoTooltip(){
    setShouldBeInfoOpen(false)
  }

  // funcion para abrir el Info Tooltip si el registro fue exitoso
  useEffect(()=>{
    if(location.state === 'success'){
      setSuccessRegister(true)
      setShouldBeInfoOpen(true)
    }
  },[location.state]);

  // Manipulacion del los valores de los inputs
  function handleChange(event){
    const {name, value} = event.target
    setUserCredentials({
      ...userCredentials, [name]: value
    })

  };

  //Manipulacion del submit del Formulario
  function handleSubmit(event){
    event.preventDefault()
    if(!userCredentials.email || !userCredentials.password){
      return 
    }
      auth
        .authorize(userCredentials.email, userCredentials.password)
        .then((data)=>{
          if(data.token){
            setUserCredentials({
              email: '',
              password: ''
            });
            isUserLogged();
            navigate('/');
          }
        })
        .catch((error)=> console.log(error));
    
  }
  return (
    <>
      <Header
      linkRoute={"/signup"}
      signText={'Registrate'}
      />
      <FormUser
      title={"Inicia sesion"}
      buttonText={"Inicia sesion"}
      linkSpan={"/signup"}
      linkText={"¿Aún no eres miembro? Regístrate aquí"}
      onSubmit={handleSubmit}
      onChange={handleChange}
      >
      </FormUser>
      <InfoTooltip
        isSuccess={successRegister}
        isOpen={shoulBeInfoOpen}
        name={"tooltip"}
        onClose={closeInfoTooltip}
      />
    </>
  );
}
export default Login;