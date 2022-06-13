export class Api {
  constructor(data){
    this._url = data.url;
    this._headers = data.headers;
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