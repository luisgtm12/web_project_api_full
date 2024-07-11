import closeIcon from '../images/close-icon.png'


function PopupWithForm ({title,name,children,isOpen,onClose}){
  return(
    <>
      <div id={`modal-${name}`} className={`modal modal_type_${name} ${isOpen ? "modal__opened" : ""}`}>
          <div className="modal__contain">
            <img
              src={closeIcon}
              id={`close-icon-${name}`}
              alt="icono de cierre"
              className="modal__close-icon"
              onClick={onClose}
            />
            <h4 className="modal__contain-title">{title}</h4>
            {children}
          </div>
        </div>
    </>
  )
}
export default PopupWithForm;