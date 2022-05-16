import {openPopup} from './index.js'
const popupImage = document.querySelector('.popup__image');
const popupTitleViewImage = document.querySelector('.popup__title_viewimage');
const popupViewImage = document.querySelector('.popup_type_viewimage');

export class card {
  constructor(description, image) {
    this._description = description;
    this._image = image;
  }

  _getTemplate() {
    const cardElement = document.querySelector('.element-template').content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _removeCard() {
    this._elementCard.remove();
  }

  _togglelike() {
    this._elementCard.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _openPopupViewImage() {
    popupImage.src = this._image;
    popupImage.alt = this._description; 
    popupTitleViewImage.textContent = this._description;
    
    openPopup(popupViewImage);
  }

  getCard = () => {
    this._elementCard = this._getTemplate();

    this._elementCard.querySelector('.element__description').textContent = this._description;
    this._elementCard.querySelector('.element__image').src = this._image;
    this._elementCard.querySelector('.element__image').alt = this._description;

    this._elementCard.querySelector('.element__delete-button').addEventListener('click', () => {this._removeCard()});
    this._elementCard.querySelector('.element__like-button').addEventListener('click', () => {this._togglelike()});
    this._elementCard.querySelector('.element__image').addEventListener('click', () => {this._openPopupViewImage()});

    return this._elementCard;
  }
}