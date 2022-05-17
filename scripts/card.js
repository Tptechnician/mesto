import {popupImage, popupTitleViewImage, popupViewImage, openPopup} from './utils.js'

export class card {
  constructor(description, image, template) {
    this._description = description;
    this._image = image;
    this._template = template;
  }

  //Приватный метод выбора элемента template
  _getTemplate() {
    const cardElement = this._template.content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  //Приватный метод удаление карточки
  _removeCard() {
    this._elementCard.remove();
  }

  //Приватный метод Like
  _togglelike() {
    this._elementCard.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  //Приватный метод просмотр img из карточки
  _openPopupViewImage() {
    popupImage.src = this._image;
    popupImage.alt = this._description; 
    popupTitleViewImage.textContent = this._description;
    
    openPopup(popupViewImage);
  }

  //Публичный метод создания новой карточки
  getCard () {
    this._elementCard = this._getTemplate();
    const image = this._elementCard.querySelector('.element__image');
    this._elementCard.querySelector('.element__description').textContent = this._description;
    image.src = this._image;
    image.alt = this._description;

    this._elementCard.querySelector('.element__delete-button').addEventListener('click', () => {this._removeCard()});
    this._elementCard.querySelector('.element__like-button').addEventListener('click', () => {this._togglelike()});
    this._elementCard.querySelector('.element__image').addEventListener('click', () => {this._openPopupViewImage()});

    return this._elementCard;
  }
}
