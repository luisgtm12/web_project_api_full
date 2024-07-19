import editIcon from '../images/avatar-edit.png'
import addIcon from '../images/icono-add.png'
function Profile ({onEditAvatarClick, onEditProfileClick,onAddPlaceClick,currentUser}){

  const currentAvatar = currentUser.avatar ;
  const currentName = currentUser.name;
  const currentAbout =  currentUser.about;
  return(
    <>
    <section>
          <div className="profile">
            <div className="profile__avatar-overlay" onClick={onEditAvatarClick}></div>
            <img style={{backgroundImage:`url(${currentAvatar})`}} id="avatar" alt="foto de perfil" className="profile-avatar"/>
            <div className="profile__content">
              <h2 className="profile__content-name">{currentName}</h2>
              <h3 className="profile__content-workstation">{currentAbout}</h3>
              <img src={editIcon} alt="boton de editar" className="profile__edit-button" onClick={onEditProfileClick}/>
            </div>
            <button className="profile__add-button" onClick={onAddPlaceClick}>
              <img src={addIcon} id="add-icon" alt="icono de simbolo +"/>
            </button>
          </div>
        </section>
    </>
  )
}
export default Profile;