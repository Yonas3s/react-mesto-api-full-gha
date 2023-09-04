import { useState } from "react";

export default function Login( { onLogin } ) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    function handleEmailChange(evt) {
      setEmail(evt.target.value);
    }
    
    function handlePasswordChange(evt) {
      setPassword(evt.target.value);
    }
    
    function handleSubmit(e) {
      e.preventDefault();
      onLogin(password, email);
    }

  return (
    <div className="sign__container">
      <form className="sign__form" onSubmit={handleSubmit}>
        <h3 className="sign__title">Вход</h3>
        <div className="sign__input-container">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="sign__input"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            name="password"
            id="password"
            type="password"
            placeholder="Пароль"
            className="sign__input"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="sign__button">
          Войти
        </button>
      </form>
    </div>
  );
}
