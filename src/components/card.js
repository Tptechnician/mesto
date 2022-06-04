

export class Card {
  constructor(description, image, template, handleCardClick) {
    this._description = description;
    this._image = image;
    this._template = template;
    this._handleCardClick = handleCardClick;
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
    this.elementlike.classList.toggle('element__like-button_active');
  }

  _setEventListeners() {
    const image = this._elementCard.querySelector('.element__image');
    image.src = this._image;
    image.alt = this._description;
    this.elementlike = this._elementCard.querySelector('.element__like-button');
    this._elementCard.querySelector('.element__delete-button').addEventListener('click', () => {this._removeCard()});
    this._elementCard.querySelector('.element__like-button').addEventListener('click', () => {this._togglelike()});
    this._elementCard.querySelector('.element__image').addEventListener('click', () => {this._handleCardClick({name: image.alt, link: image.src})});
  }

  //Публичный метод создания новой карточки
  getCard () {
    this._elementCard = this._getTemplate();    
    this._elementCard.querySelector('.element__description').textContent = this._description;
    this._setEventListeners();

    return this._elementCard;
  }
}
