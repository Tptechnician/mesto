import {Popup} from './Popup.js';

export class PopupWithConfirmation extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._form = this._popupSelector.querySelector('.popup__form');
  }

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