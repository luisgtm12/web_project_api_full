import closeIcon from "../images/close-icon.png"
import iconSuccess from "../images/Corretc.png"
import iconError from "../images/Incorrect.png"
function InfoTooltip ({isSuccess,name,isOpen,onClose}){
  const icon = isSuccess ? iconSuccess : iconError;
  const messagge = isSuccess 
      ?'¡Correcto! Ya estás registrado.'
      : 'Uy, algo salió mal. Por favor, inténtalo de nuevo.';
  return(
    <div id={`modal-${name}`} className={`modal modal_type_${name} ${isOpen ? "modal__opened" : ""}`}>
          <div className="modal__contain">
            <img
              src={closeIcon}
              id={`close-icon-${name}`}
              alt="icono de cierre"
              className="modal__close-icon info-close"
              onClick={onClose}
            />
            <div className="modal__content">
              <img src={icon}
                className="modal__content_img"
                />
              <h4 className="modal__content-title">{messagge}</h4>
            </div>
            
          </div>
        </div>
  )
}
export default InfoTooltip;