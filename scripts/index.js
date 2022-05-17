import {card} from './card.js'
import {FormValidator} from'./FormValidator.js'
import {popupViewImage, openPopup, closePopup} from './utils.js'

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_no-active',
  inputErrorClass: 'popup__input_type_error'
};

const template = document.querySelector('.element-template');
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
const popupCloseAddImage = document.querySelector('.popup__close-addimage');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const formPopupProfile = document.forms.formPopup;
const nameInput = formPopupProfile.elements.inputname;
const jobInput = formPopupProfile.elements.inputactivity;
const popups = Array.from(document.querySelectorAll('.popup'));
const submitButton = formAddImage.querySelector('.popup__save');


//Запуск валидации формы добавления карточки
const formAddImageValidator = new FormValidator(config, formAddImage);
formAddImageValidator.enableValidation();

//Запуск валидации формы редактирования профиля
const formPopupProfileValidator = new FormValidator(config, formPopupProfile);
formPopupProfileValidator.enableValidation();

function newCard (name, link, template){
  const newCard = new card(name, link, template).getCard();
  return newCard;
}

//Загрузка карточек при загрузке страницы
initialCards.forEach((element) => {
  elementsCards.append(newCard(element.name, element.link, template));
});


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
function submitAddImageForm (evt) {
  evt.preventDefault();

  elementsCards.prepend(newCard(titleInput.value, linkInput.value, template));
  closePopup(popupAddImage);

  titleInput.value = '';
  linkInput.value = '';

  submitButton.disabled = true;
  submitButton.classList.add('popup__save_no-active');
}


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


//Закрытия popup при клике по overlay
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
  }});
});


// Обработчики открытия, закрытия popup добавления карточки
profileAddButton.addEventListener('click', () => {
  resetError ();
  titleInput.value = '';
  linkInput.value = '';
  
  openPopup(popupAddImage)
});
popupCloseAddImage.addEventListener('click', () => {
  closePopup(popupAddImage)
});

// Обработчик закрытие popup просмотра Img
popupCloseViewImage.addEventListener('click', () => closePopup(popupViewImage));
// Обработчик открытие popup редоктирования профиля
profileEditButton.addEventListener('click', () => handleOpenProfilePopup());
// Обработчик закрытие popup редоктирования профиля
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
// Обработчик submit формы редоктирования профиля
formPopupProfile.addEventListener('submit', submitHandlerform);
// Обработчик submit формы добавления карточки
formAddImage.addEventListener('submit', submitAddImageForm);
