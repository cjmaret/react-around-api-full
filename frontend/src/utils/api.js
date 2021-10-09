class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _returnRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  getCardList(token) {
    return fetch(this._baseUrl + "/cards", {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  getUserInfo(token) {
    return fetch(this._baseUrl + "/users/me", {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  addLike(cardId, token) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  removeLike(cardId, token) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      this.addLike(cardId);
    } else {
      this.removeLike(cardId);
    }
  }

  removeCard(cardId, token) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  setUserInfo({ name, about }, token) {
    return fetch(this._baseUrl + "/users/me", {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  setUserAvatar(avatar, token) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  addCard({ name, link }, token) {
    return fetch(this._baseUrl + "/cards", {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      return this._returnRes(res);
    });
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
});

export default api;
