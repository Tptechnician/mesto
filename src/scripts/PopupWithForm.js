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
    const inputsList = this._form.querySelectorAll('.popup__input');
    const data = [];
    inputsList.forEach(input => {
      data[input.name] = input.value;
    })
    
    return data;
    
  }

  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      this._submitEvtHandler();
    });
  }
  
  close() {
    this._form.reset();
    super.close();
  }
}
