import {Popup} from './Popup.js';

export class PopupWithForm extends Popup{
  constructor(popupSelector, submit){
    super(popupSelector)
    this._form = this._popupSelector.querySelector('.popup__form');
    this._submit = submit;
  }

  _submitEvtHandler() {
    this._submit(this._getInputValues());
  }

  _getInputValues() {
    this._inputsList = this._form.querySelectorAll('.popup__input');
    this._data = [];
    this._inputsList.forEach(input => {
      this._data[input.name] = input.value;
    })
    
    return this._data;
    
  }

  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submitEvtHandler();
    });
  }
  
  close() {
    this._form.reset();
    super.close();
  }
}
