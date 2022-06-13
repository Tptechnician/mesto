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
}