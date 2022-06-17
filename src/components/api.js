export class Api {
  constructor(data){
    this._url = data.url;
    this._headers = data.headers;
  }

  //Запрос на удаление карточки
  deleteCard(data) {
    return fetch(`${this._url}/cards/${data._id}`, {
      headers: this._headers,
      method: 'DELETE'
    }).then((res) => {
        if(res.ok){
        return res.json()
      }
      return Promise.reject('Ошибка');
    });
  }

  //Запрос на удаление лайка
  deleteLike(data){
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      headers: this._headers,
      method: 'DELETE'
    }).then((res) => {
        if(res.ok){
        return res.json()
      }
      return Promise.reject('Ошибка');
    });
  }

  //Запрос на добавление лайка
  addLike(data){
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      headers: this._headers,
      method: 'PUT'
    }).then((res) => {
        if(res.ok){
        return res.json()
      }
      return Promise.reject('Ошибка');
    });
  }

  //Запрос на добовление карточек
  addCard(data){
    const dataCard = {
      name: data.inputtitle,
      link: data.inputlink
    };
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(dataCard),
    }).then((res) => {
      if(res.ok){
      return res.json()
    }
    return Promise.reject('Ошибка');
  });
  }

  //Запрос на получение информации о пользователе и карточек
  getUserData() {
    return Promise.all([this.getUserInfo(), this.getCard()]);
  }
  
  //Запрос на получение информации о пользователе
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

  //Запрос на получение карточек
  getCard(){
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'GET'
    }).then((res) => {
        if(res.ok){
        return res.json()
      }
      return Promise.reject('Ошибка');
    });
  }

  //Запрос на изменение информации о пользователе
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

  //Запрос на изменение картинки пользователя
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
}
