import {Popup} from './Popup.js';

export class PopupWithForm extends Popup{
  constructor(popupSelector, submit){
    super(popupSelector)
    this._form = this._popupSelector.querySelector('.popup__form');
    this._inputsList = this._form.querySelectorAll('.popup__input');
    this._submit = submit;
  };

  _getInputValues() {
    this._data = [];
    this._inputsList.forEach(input => {
      this._data[input.name] = input.value;
    })
    
    return this._data;
  };

  /*_submitEvtHandler() {
    this._submitbtn(this._getInputValues());
  }*/

  
  
  setEventListeners() {
    super.setEventListeners;
    this._form.addEventListener('submit', (e) =>{
      e.preventDefault();
      this._submit(this._getInputValues());
    });
  };
  
  close() {
    super.close();
    this._form.reset();
  }
};
