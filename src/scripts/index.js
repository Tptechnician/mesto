import {initialCards} from './cards.js'
import {card} from './card.js'
import {Popup} from './Popup.js'
import {FormValidator} from'./FormValidator.js'
import {Section} from'./Section.js'
import {PopupWithImage} from'./PopupWithImage.js'
import {PopupWithForm} from'./PopupWithForm.js'
import {
  popupImage,
  popupTitleViewImage,
  popupViewImage,
  template
} from './constants.js';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_no-active',
  inputErrorClass: 'popup__input_type_error'
};


const elementsCards = document.querySelector('.elements__cards');
const profileAddButton = document.querySelector('.profile__add-button');
const formAddImage = document.forms.formPopupAddImage;
const titleInput = formAddImage.elements.inputtitle;
const linkInput = formAddImage.elements.inputlink;
const popupCloseViewImage = document.querySelector('.popup__close-viewimage');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close');
const popupAddImage = document.querySelector('.popup_type_addimage');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const formPopupProfile = document.forms.formPopup;
const nameInput = formPopupProfile.elements.inputname;
const jobInput = formPopupProfile.elements.inputactivity;
const submitButton = formAddImage.querySelector('.popup__save');


//Запуск валидации формы добавления карточки
const formAddImageValidator = new FormValidator(config, formAddImage);
formAddImageValidator.enableValidation();

//Запуск валидации формы редактирования профиля
const formPopupProfileValidator = new FormValidator(config, formPopupProfile);
formPopupProfileValidator.enableValidation();

//Функция создания карточки
function newCard (name, link, template, handleCardClick){
  const newCard = new card(name, link, template, handleCardClick).getCard();

  return newCard;
}

//Загрузка карточек при загрузке страницы
const instancePopupImage = new PopupWithImage(popupViewImage);

const cardObject = new Section({items: initialCards, 
  renderer: (items) => {
    const cardElement = newCard(items.name, items.link, template, 
      ({name, link}) => {
        instancePopupImage.open({name, link});
      });

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
}



//Добавление новой карточки
const formAddImg = new PopupWithForm(popupAddImage, 
  (data) => {
    
    const cardObject = new Section({items: [{name: data.inputtitle, link: data.inputlink}], 
      renderer: (items) => {
        const cardElement = newCard(items.name, items.link, template, 
          ({name, link}) => {
            instancePopupImage.open({name, link});
          });
    
        cardObject.addItemPrepend(cardElement);
      }
  }, elementsCards);
    
    cardObject.render();
    formAddImg.close();
    submitButton.disabled = true;
    submitButton.classList.add('popup__save_no-active');
  });

// Обработчики открытия, popup добавления карточки
profileAddButton.addEventListener('click', () => {
  formAddImg.setEventListeners();
  const popup = new Popup(popupAddImage);
  popup.open();
});


//Открытие popup редоктирования профиля
function handleOpenProfilePopup() {
  resetError ();

  nameInput.value = profileName.textContent;
  jobInput.value = profileActivity.textContent;

  openPopup(popupProfile)
}


//submit формы редоктирования профиля
function submitHandlerform (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileActivity.textContent = jobInput.value;

    closePopup(popupProfile);
}

// Обработчик закрытие popup просмотра Img
popupCloseViewImage.addEventListener('click', () => closePopup(popupViewImage));
// Обработчик открытие popup редоктирования профиля
profileEditButton.addEventListener('click', () => handleOpenProfilePopup());
// Обработчик закрытие popup редоктирования профиля
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
// Обработчик submit формы редоктирования профиля
formPopupProfile.addEventListener('submit', submitHandlerform);

