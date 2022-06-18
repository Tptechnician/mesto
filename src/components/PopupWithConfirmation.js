import {Popup} from './Popup.js';

export class PopupWithConfirmation extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._form = this._popupSelector.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__save');
  }

  renderLoading(isLoading){
    if(isLoading){
      this._submitButton.textContent = ('Сохранение...');
    }else{
      this._submitButton.textContent = ('Да');
    };
  };

  //Метод для передачи колбека функции удаления карточки в обработчик submit
  handleEvtSubmit(fndel) {
    this._funDelCard = fndel;
  };

  //метод установки обработчика submit
  setEventListener(){
    this._form.addEventListener('submit', (e)=>{
      e.preventDefault();
      this._funDelCard();
    });
  };
}