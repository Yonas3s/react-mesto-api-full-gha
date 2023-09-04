import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

export default function Header({ name, dataUser }) {

  function onSignOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("data");
  }

  return (
    <header className="header" name={name}>
      <img className="header__logo" src={logo} alt="логотип" />
      {name === "signup" || name === "signin" ? (
        <Link
          to={name === "signup" ? "/sign-in" : "/sign-up"}
          className="header__link"
        >
          {name !== "signup" ? "Регистрация" : "Войти"}
        </Link>
      ) : (
        <>
          <div className="header__email-container">
            <p className="header__email">{dataUser}</p>
            <Link to={`/sign-in`} className="header__link" onClick={onSignOut}>
              Выйти
            </Link>
          </div>
        </>
      )}
    </header>
  );
}
