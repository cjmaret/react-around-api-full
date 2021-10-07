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

    getCardList() {
        return fetch(this._baseUrl + '/cards', {
            method: "GET",
            headers: this._headers,
        })
            .then(res => {
                return this._returnRes(res);
            })
    }

    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            method: "GET",
            headers: this._headers,
        })
            .then(res => {
                return this._returnRes(res);
            })
    }

    addLike(cardId) {
        return fetch(this._baseUrl + '/cards/likes/' + cardId, {
            method: "PUT",
            headers: this._headers,
        })
            .then(res => {
                return this._returnRes(res);
            })
    }

    removeLike(cardId) {
        return fetch(this._baseUrl + '/cards/likes/' + cardId, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(res => {
                return this._returnRes(res);
            })
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (!isLiked) {
            this.addLike(cardId);
        } else {
            this.removeLike(cardId);
        }
    }

    removeCard(cardId) {
        return fetch(this._baseUrl + '/cards/' + cardId, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(res => {
                return this._returnRes(res);
            })
    }

    setUserInfo({ name, about }) {
        return fetch(this._baseUrl + '/users/me', {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(res => {
                return this._returnRes(res);
            })
    }

    setUserAvatar(avatar) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar,
            })
        })
            .then(res => {
                return this._returnRes(res);
            });
    }

    addCard({ name, link }) {
        return fetch(this._baseUrl + '/cards', {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(res => {
                return this._returnRes(res);
            })
    }


}

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers: {
        authorization: `Bearer token`,
        "Content-Type": "application/json"
    }
});

export default api;