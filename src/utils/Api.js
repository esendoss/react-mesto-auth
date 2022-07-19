class Api {
  constructor(options) {
    this._url = options.url;
    this._token = options.token;
  }

  _checkError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
      .then(this._checkError)
  }

  getInitialCards() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
      .then(this._checkError)
  }

  editProfileInfo(data) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(this._checkError)
  }
  addUserCard(name, link) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._checkError)
  }
  deleteCard(cardId) {
    return fetch(this._url + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      },
    })
      .then(this._checkError)
  }
  updateСardLike(cardId, isLiked) {
    if (isLiked) {
        return this._like(cardId);
    } else {
        return this._dislike(cardId);        
    }
}
  _like(cardId) {
    return fetch(this._url + `/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
      .then(this._checkError)
  }

  _dislike(cardId) {
    return fetch(this._url + `/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(this._checkError)
  }
  
  editAvatar(data) {
    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(this._checkError)
  }

}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-42',
  token: '344a814f-d599-45ca-823f-f73b614ea6ce'
});
export { api } 