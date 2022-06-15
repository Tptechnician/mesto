export class Api {
  constructor(data){
    this._url = data.url;
    this._headers = data.headers;
  }

  deleteLike(data){
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then((res) => {
        if(res.ok){
        return res.json()
      }
      return Promise.reject('Ошибка');
    });
  }

  addLike(data){
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      headers: this._headers,
      method: 'PUT'
    })
      .then((res) => {
        if(res.ok){
        return res.json()
      }
      return Promise.reject('Ошибка');
    });
  }

  getUserData() {
    return Promise.all([this.getUserInfo(), this.getCard()]);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'GET'
    }).then((res) => {
      if(res.ok){
      return res.json()
    }
    return Promise.reject('Ошибка');
  });
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: data.inputname, 
        about: data.inputactivity
      })
    }).then((res) => {
      if(res.ok){
      return res.json()
    }
    return Promise.reject('Ошибка');
  });
  }

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.inputlink
      })
    }).then((res) => {
      if(res.ok){
      return res.json()
    }
    return Promise.reject('Ошибка');
  });
  }


  getCard(){
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'GET'
    })
      .then((res) => {
        if(res.ok){
        return res.json()
      }
      return Promise.reject('Ошибка');
    });
  }

  addCard(data){
    const dataCard = {
      name: data.inputtitle,
      link: data.inputlink
    };
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(dataCard),
    })
    .then((res) => {
      if(res.ok){
      return res.json()
    }
    return Promise.reject('Ошибка');
  });
  }
}
