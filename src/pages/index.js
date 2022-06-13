import './index.css';
//import {initialCards} from '../scripts/cards.js'
import {Card} from '../components/card.js'
import {FormValidator} from'../components/FormValidator.js'
import {Section} from'../components/Section.js'
import {PopupWithImage} from'../components/PopupWithImage.js'
import {PopupWithForm} from'../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'
import {Api} from '../components/api.js'

import {
  popupViewImage,
  template,
  elementsCards,
  profileAddButton,
  profileEditButton,
  popupProfile,
  popupAddImage,
  profileName,
  profileActivity,
  nameInput,
  jobInput,
  avatarButton,
  popupAvatar,
  profileAvatarImg,
  config
} from '../scripts/constants.js';

//Экземпляр класса Api
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: '8bdc11e5-0409-4a66-a2e9-cb41b1679eea',
    'Content-Type': 'application/json'
  }
});

//Экземпляр класса Section
const cardObject = new Section((item) => {
    const cardElement = newCard(item.name, item.link, template);

    cardObject.addItem(cardElement);
  }, elementsCards);

//Экземпляр класса PopupWithImage
const instancePopupImage = new PopupWithImage(popupViewImage);

//Экземпляр класса UserInfo
const userInfo = new UserInfo ({name: profileName, activity: profileActivity});


//Запуск валидации
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)

    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
   validator.enableValidation();
  });
};
enableValidation(config);


//Функция создания карточки
function newCard (name, link, template){
  const newCard = new Card(name, link, template, ({name, link}) => {
    instancePopupImage.open({name, link});
  }).getCard();

  return newCard;
}


//Загрузка карточек при загрузке страницы
api.getCard()
  .then((item) =>{
    cardObject.render(item);
  })
  .catch((err) => {
    console.log(err);
  });



//Добавление новой карточки

const formAddImg = new PopupWithForm({popupSelector: popupAddImage, 
  submit: (data) => {
    api.addCard(data)
      .then((res) =>{
        const card = newCard(res.name, res.link, template);
        cardObject.addItemPrepend(card);
      })
      .catch((err) => {
        console.log(err);
      });
    
    formAddImg.close();
  }});


//Редоктирование профиля
const formProfile = new PopupWithForm({popupSelector: popupProfile,
  submit: (data) => {
    userInfo.setUserInfo(data);
    
    formProfile.close();
  }});

// Редоктирование картинки Аватара
  const formAvatar = new PopupWithForm({popupSelector: popupAvatar,
    submit: (data) => {
      profileAvatarImg.src = data.inputlink;
      formAvatar.close();
    }});


// Обработчик открытия, popup добавления карточки
profileAddButton.addEventListener('click', () => {
  
  formValidators['formPopupAddImage'].resetValidation();
  formAddImg.open();
});


// Обработчик открытие popup редоктирования профиля
profileEditButton.addEventListener('click', () => {
  const userInfoList = userInfo.getUserInfo();

  nameInput.value = userInfoList.name;
  jobInput.value = userInfoList.activity;

  formValidators['formPopup'].resetValidation();
  formProfile.open();
});

//Обработчик открытие popup редоктирования Аватара
avatarButton.addEventListener('click', () => {

  formValidators['formPopupAvatar'].resetValidation();
  formAvatar.open();
});
