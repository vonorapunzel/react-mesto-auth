import React from 'react';

function Login({handleAuthorization}, ...props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
      setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleAuthorization({email, password});
  }

  return(
    <div className="entrance">
      <form className="entrance-form" onSubmit={handleSubmit} >
        <h2 className="entrance-form__title">Вход</h2>
        <input className="entrance-form__input" name="email" placeholder="Email" type="email" value={email} onChange={handleChangeEmail}/>
        <input className="entrance-form__input" name="password" placeholder="Пароль" type="password" value={password} onChange={handleChangePassword}/>
        <button className="entrance-form__button-submit" type="submit">Войти</button>
      </form> 
    </div>
  )
}

export default Login;