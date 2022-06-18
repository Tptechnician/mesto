import {Popup} from './Popup.js';

export class PopupWithForm extends Popup{
  constructor({popupSelector, submit}){
    super(popupSelector)
    this._form = this._popupSelector.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__save');
    this._inputsList = this._form.querySelectorAll('.popup__input');
    this._submit = submit;
    this._handleEvtSubmit = this._handleEvtSubmit.bind(this);
  };

  renderLoading(isLoading){
    if(isLoading){
      this._submitButton.textContent = ('Сохранение...');
    }else{
      this._submitButton.textContent = ('Сохраненить');
    };
  };

  _getInputValues() {
    this._data = [];
    this._inputsList.forEach(input => {
      this._data[input.name] = input.value;
    });
    
    return this._data;
  };

  _handleEvtSubmit(e) {
    e.preventDefault();
      this._submit(this._getInputValues());
  };
  
  _removeEventListeners() { 
    super._removeEventListeners(); 
    this._form.removeEventListener('submit', this._handleEvtSubmit);
  };
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleEvtSubmit);
  };
  
  close() {
    super.close();
    this._form.reset();
    this._removeEventListeners();
  };
};
