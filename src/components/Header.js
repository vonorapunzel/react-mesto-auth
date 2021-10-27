import logo from "../images/Logo.svg";
import {Switch, Route, Link} from 'react-router-dom';

function Header({emailUser, onLogOff}) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <Switch>
        <Route exact path="/">
          <div className="header__container">
              <p className="header__email">{emailUser}</p>
              <Link to="/sign-in" className="header__login" onClick={onLogOff}>Выход</Link>
          </div>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__login">Войти</Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__login">Регистрация</Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
