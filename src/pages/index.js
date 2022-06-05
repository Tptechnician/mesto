import './index.css';
import {initialCards} from '../scripts/cards.js'
import {Card} from '../components/card.js'
import {Popup} from '../components/Popup.js'
import {FormValidator} from'../components/FormValidator.js'
import {Section} from'../components/Section.js'
import {PopupWithImage} from'../components/PopupWithImage.js'
import {PopupWithForm} from'../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'

import {
  popupViewImage,
  template,
  elementsCards,
  profileAddButton,
  formAddImage,
  profileEditButton,
  popupProfile,
  popupAddImage,
  profileName,
  profileActivity,
  formPopupProfile,
  nameInput,
  jobInput,
  submitButton,
  config
} from '../scripts/constants.js';
const instancePopupImage = new PopupWithImage(popupViewImage);


//Запуск валидации формы добавления карточки
const formAddImageValidator = new FormValidator(config, formAddImage);
formAddImageValidator.enableValidation();

//Запуск валидации формы редактирования профиля
const formPopupProfileValidator = new FormValidator(config, formPopupProfile);
formPopupProfileValidator.enableValidation();



//Функция создания карточки
function newCard (name, link, template, handleCardClick){
  const newCard = new Card(name, link, template, ({name, link}) => {
    instancePopupImage.open({name, link});
  }).getCard();

  return newCard;
}

//Загрузка карточек при загрузке страницы
const cardObject = new Section({item: initialCards, 
  renderer: (item) => {
    const cardElement = newCard(item.name, item.link, template);

    cardObject.addItem(cardElement);
  }
}, elementsCards);

cardObject.render();


//Сброс ошибок в input
function resetError () {
  const errorElement = Array.from(document.querySelectorAll('.popup__form-error'));
  const errorInput = Array.from(document.querySelectorAll('.popup__input'));
  errorElement.forEach((errorElement) => {
    errorElement.textContent = '';
  });
  errorInput.forEach((errorInput) => {
    errorInput.classList.remove('popup__input_type_error');
  });
};


//Добавление новой карточки
const formAddImg = new PopupWithForm(popupAddImage, 
  (data) => {
    const card = newCard(data.inputtitle, data.inputlink, template);
    cardObject.addItemPrepend(card);
    
    formAddImg.close();
    submitButton.disabled = true;
    submitButton.classList.add('popup__save_no-active');
  });

// Обработчики открытия, popup добавления карточки
profileAddButton.addEventListener('click', () => {
  resetError ();
  
  //const popup = new Popup(popupAddImage);
  formAddImg.open();
});
formAddImg.setEventListeners();


//Экземпляр класса UserInfo
const userInfo = new UserInfo ({name: profileName, activity: profileActivity});


const formProfile = new PopupWithForm(popupProfile,
    (data) => {
      userInfo.setUserInfo(data);
    
    formProfile.close();
    submitButton.disabled = true;
    submitButton.classList.add('popup__save_no-active');
  }
  );
  formProfile.setEventListeners();


// Обработчик открытие popup редоктирования профиля
profileEditButton.addEventListener('click', () => {
  resetError ();
  const userInfoList = userInfo.getUserInfo();

  nameInput.value = userInfoList.name;
  jobInput.value = userInfoList.activity;

  const popup = new Popup(popupProfile);
  popup.open();
});
