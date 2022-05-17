import {card} from './card.js'
import {FormValidator} from'./FormValidator.js'

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
const popupViewImage = document.querySelector('.popup_type_viewimage');
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


//Запуск валидации формы добавления карточки
const formAddImageValidator = new FormValidator(config, formAddImage);
formAddImageValidator.enableValidation();

//Запуск валидации формы редактирования профиля
const formPopupProfileValidator = new FormValidator(config, formPopupProfile);
formPopupProfileValidator.enableValidation();


//Загрузка карточек при загрузке страницы
initialCards.forEach((element) => {
  const cd = new card(element.name, element.link)
  const cardElement = cd.getCard();

  document.querySelector('.elements__cards').append(cardElement);
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


// Открытие Popup
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
}


// Закрытие Popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
}


//Добавление новой карточки
function submitAddImageForm (evt) {
  evt.preventDefault();

  const data = new card(titleInput.value, linkInput.value).getCard();

  elementsCards.prepend(data);
  closePopup(popupAddImage);

  titleInput.value = '';
  linkInput.value = '';
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


// Закрытия popup при нажатии на Esc
function closePopupEscape(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
}


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
