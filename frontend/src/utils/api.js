class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  defaultProfile(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getAuthHeaders(),
    }).then(this._checkResponse);
  }

  getCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getAuthHeaders(),
    }).then(this._checkResponse);
  }

  addCards(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  updateProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._getAuthHeaders(),
    }).then(this._checkResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._getAuthHeaders(),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getAuthHeaders(),
    }).then(this._checkResponse);
  }
  
  _getAuthHeaders() {
    const token = localStorage.getItem('token');
    if (!token) {
      return this._headers;  // Return the headers without Authorization if no token is found
    }
    return {
      ...this._headers,
      'Authorization': `Bearer ${token}`,
    };
  }
}

//const base_url ="http://api.web-around.mooo.com";
const base_url ="http://localhost:8001";
//const token = localStorage.getItem('jwt');
export const api = new Api({
  baseUrl: base_url,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;