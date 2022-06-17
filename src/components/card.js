export class Card {
  constructor(data, template, userId, {handleCardClick, setLike, deleteLike, deleteCard}) {
    this._data = data;
    this._userId = userId;
    this._description = data.name;
    this._idUser = data.owner._id;
    this._image = data.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._setLike = setLike;
    this._deleteLike = deleteLike;
    this._deleteCard = deleteCard;
  }

  //Приватный метод выбора элемента template
  _getTemplate() {
    const cardElement = this._template.content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  //Методы удаления карточки
  deleteCard() {
    this._removeCard(this._elementCard);
  }
  
  _removeCard() {
    this._elementCard.remove();
  }

  //Методы постановки, удаления, проверки и установки колличества лайков
  _dellike(data) {
    this._removeClassLiked();
    this._deleteLike(data);
  }

  _like(data) {
    this._addClassLiked();
    this._setLike(data);
  }

  _removeClassLiked() {
    this.elementlike.classList.remove('element__like-button_active');
  }

  _addClassLiked() {
    this.elementlike.classList.add('element__like-button_active');
  }

  _setUsersLikes(){
    this._data.likes.forEach((userId) => {
      if(userId._id === this._userId){
        this.elementlike.classList.add('element__like-button_active');
      }
    });
  }
  setLikeCount(data){
      this._elementCard.querySelector('.element__like-count').textContent = data.likes.length;
    }

  //Приватный метод установки кнопки удаления карточки
  _setDeleteButton(){
    if(this._data.owner._id === this._userId){
      this._deleteButton.classList.add('element__delete-button_active');
    }
  };
   
  //Приватный метод установки обработчико событий карточки
  _setEventListeners() {
    const image = this._elementCard.querySelector('.element__image');
    image.src = this._image;
    image.alt = this._description;
    this.elementlike = this._elementCard.querySelector('.element__like-button');
    this._deleteButton = this._elementCard.querySelector('.element__delete-button');
    this._deleteButton.addEventListener('click', () => {this._deleteCard(this._data)});
    this._elementCard.querySelector('.element__like-button').addEventListener('click', () => {
      if (this.elementlike.classList.contains('element__like-button_active')){
        this._dellike(this._data);
      }else{
        this._like(this._data);
      }}
    );
    this._elementCard.querySelector('.element__image').addEventListener('click', () => {this._handleCardClick({name: image.alt, link: image.src})});
  }

  //Публичный метод создания новой карточки
  getCard () {
    this._elementCard = this._getTemplate();
    this._elementCard.querySelector('.element__description').textContent = this._description;
    this.setLikeCount(this._data);
    this._setEventListeners();
    this._setUsersLikes();
    this._setDeleteButton();

    return this._elementCard;
  }
}
