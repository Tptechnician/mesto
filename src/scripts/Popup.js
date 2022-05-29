export class Popup {
  constructor(popupSelector){
    this._popupSelector = popupSelector;
    this._handleClickClose = this._handleClickClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //Приватный метод закрытия popup при нажатии на Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    };
  }

  //Приватный метод закрытия popup при клике по overlay
  _handleClickClose(evt) {
      if (evt.target === evt.currentTarget) {
        this.close();
    }};

  //Приватный метод удаление обработчиков событий
  _removeEventListeners() {
    this._popupSelector.removeEventListener('click', this._handleClickClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //Публичный метод Добавление обработчиков клика по overlay и нажатия на Esc
  setEventListeners() {
    this._popupSelector.addEventListener('click', this._handleClickClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  //Публичный метод Открытие Popup
  open() {
    this.setEventListeners();
    this._popupSelector.classList.add('popup_opened');
  }
  
  //Публичный метод Закрытие Popup
  close() {
    this._removeEventListeners();
    this._popupSelector.classList.remove('popup_opened');
  }
}
