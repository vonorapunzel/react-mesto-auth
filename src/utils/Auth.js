class Auth {
  constructor() {
    this._BASE_URL = "https://auth.nomoreparties.co"
    this._headers = {
      "Accept" : "application/json",
      "Content-Type": "application/json"
    }
  };

  registration(data) {
    return fetch(`${this._BASE_URL}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
     .then((res) => this._getResponseData(res))
  }
  
  authorization(data){
    return fetch(`${this._BASE_URL}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
     .then((res) => this._getResponseData(res))
  }
  
  tokenComparison(token) {
    return fetch(`${this._BASE_URL}/users/me`, {
      method: "GET",
      headers: {"Accept" : "application/json",
      "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`},
      
    })
        .then((res) => this._getResponseData(res))
  }
  
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}

const auth = new Auth();

export default auth;