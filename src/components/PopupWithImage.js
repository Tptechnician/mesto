import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popupImage = popupSelector.querySelector('.popup__image');
    this._popupTitleViewImage = popupSelector.querySelector('.popup__title_viewimage');
  };

  open({name, link}) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupTitleViewImage.textContent = name;
    super.open();
  }
};