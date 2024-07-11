import { Link } from "react-router-dom";
import logo from "../images/logo/logo-around.png";
function Header({signText,email,linkRoute,onClick}) {
  return (
    <>
      <header>
        <div className="header">
        <img src={logo} alt="Logo de Around" className="header-logo" />
        <p className="header__subheader">{email}</p>
        <Link to={linkRoute} onClick={onClick} className="header__subheader">{signText}</Link>
        </div>
        <hr className="header-line"></hr>
      </header>
    </>
  );
}
export default Header;
