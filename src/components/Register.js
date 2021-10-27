import React from 'react';
import {Link} from 'react-router-dom';
function Register({onRegistration}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

function handleSubmit(e) {
  e.preventDefault();
  onRegistration({
    email,
    password
  });

}

function handleChangeEmail(e) {
    setEmail(e.target.value);
}

function handleChangePassword(e) {
    setPassword(e.target.value);
}

  return (
    <div className="entrance">
      <form className="entrance-form" onSubmit={handleSubmit} autoComplete="off">
        <h2 className="entrance-form__title">Регистрация</h2>
        <input className="entrance-form__input" name="email" placeholder="Email" type="email" value={email} onChange={handleChangeEmail}/>
        <input className="entrance-form__input" name="password" placeholder="Пароль" type="password" value={password} onChange={handleChangePassword}/>
        <button className="entrance-form__button-submit" type="submit">Регистрация</button>
        <p className="entrance-form__question">Уже зарегистрированы?<Link to='sign-in' className="entrance-form__enter" href="#"> Войти</Link></p>
      </form> 
    </div>
  );
}

export default Register;