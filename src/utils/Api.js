class Api {
  constructor() {
    this._url = "https://mesto.nomoreparties.co/v1/cohort-27";
    this._headers = {
      authorization: "4eb3e4fd-35e6-4e03-a07a-c921c4bb1bec",
      "Content-Type": "application/json",
    };
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  editUserProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((response) => {
      const result = this._getResponseData(response);
      return result;
    });
  }

  getUserProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      const result = this._getResponseData(res);
      return result;
    });
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((res) => {
      const result = this._getResponseData(res);
      return result;
    });
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      const result = this._getResponseData(res);
      return result;
    });
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      const result = this._getResponseData(res);
      return result;
    });
  }

  likeCard(id, method) {
    if (method === true) {
      this._method = "PUT";
    } else {
      this._method = "DELETE";
    }

    return fetch(`${this._url}/cards/likes/${id}`, {
      method: this._method,
      headers: this._headers,
    }).then((res) => {
      const result = this._getResponseData(res);
      return result;
    });
  }

  changeAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((response) => {
      const result = this._getResponseData(response);
      return result;
    });
  }
}

const api = new Api();

export default api;
