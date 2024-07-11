import closeIcon from '../images/close-icon.png'

function ImagePopup({title,image,isOpen,onclose}) {
  return (
    <div id="modal-img" className={`modal ${isOpen ? 'modal__opened' : ''}`}>
      <div className="modal__contain-img">
        <img
          src={closeIcon}
          id="close-icon-image"
          alt="icono de cierre"
          className="modal__close-icon"
          onClick={onclose}
        />
        <img
          src={image}
          id="modal-img-src"
          className="modal__img"
          alt={`paisaje ${title}`}
        />
        <h4 id="modal-img-title" className="modal__title">
          {title}
        </h4>
      </div>
    </div>
  );
}
export default ImagePopup;