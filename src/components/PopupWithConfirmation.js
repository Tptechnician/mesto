import {Popup} from './Popup.js';

export class PopupWithConfirmation extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._form = this._popupSelector.querySelector('.popup__form');
  }

  setEventListener(fndel){
    this._form.addEventListener('submit', (e)=>{
      e.preventDefault();
      fndel();
    });
  }
}