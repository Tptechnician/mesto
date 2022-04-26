const elementsCards = document.querySelector('.elements__cards');
const elementTemplate = document.querySelector('.element__template');
const profileAddButton = document.querySelector('.profile__add__button');
const formAddImage = document.forms.formPopupAddImage;
const titleInput = formAddImage.elements.inputTitle;
const linkInput = formAddImage.elements.inputLink;
const popupViewImage = document.querySelector('.popup_type_viewimage');
const popupImage = document.querySelector('.popup__image');
const popupTitleViewImage = document.querySelector('.popup__title_viewimage');
const popupCloseViewImage = document.querySelector('.popup__close__viewimage');
const profileEditButton = document.querySelector('.profile__edit__button');
const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close');
const popupAddImage = document.querySelector('.popup_type_addimage');
const popupCloseAddImage = document.querySelector('.popup__close__addimage');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const formPopupProfile = document.forms.formPopup;
const nameInput = formPopupProfile.elements.inputName;
const jobInput = formPopupProfile.elements.inputActivity;
const popup = Array.from(document.querySelectorAll('.popup'));

//Сброс ошибок в input
function resetError () {
  const errorElement = Array.from(document.querySelectorAll('.popup__form__error'));
  const errorInput = Array.from(document.querySelectorAll('.popup__input'));
  errorElement.forEach((errorElement) => {
    errorElement.textContent = '';
  });
  errorInput.forEach((errorInput) => {
    errorInput.classList.remove('popup__input_type_error');
  });
}


//Загрузка карточек при загрузке страницы
function addCards() {
  const cards = initialCards.map(getCard);
  elementsCards.prepend(...cards);
}

addCards();

function getCard(element) {
  const template = elementTemplate.content.cloneNode(true);
  const description = template.querySelector('.element__description');
  const image = template.querySelector('.element__image');
  const deleteButton = template.querySelector('.element__delete__button');
  const buttonLike = template.querySelector('.element__like__button');
    
  description.textContent = element.name;
  image.src = element.link;
  image.alt = element.name;

  formAddImage.addEventListener('submit', submitAddImageForm);
  deleteButton.addEventListener('click', removeCard);
  buttonLike.addEventListener('click', togglelike);
  image.addEventListener('click', () => openPopupViewImage(element));
  
  return template;
}


// Открытие Popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
}


// Закрытие Popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
}


//Просмотр img из карточки
function openPopupViewImage(element) {

  popupImage.src = element.link;
  popupImage.alt = element.name; 
  popupTitleViewImage.textContent = element.name;

  openPopup(popupViewImage);
}


//Добавление новой карточки
function submitAddImageForm (evt) {
  evt.preventDefault();

  let data = getCard({
    name: titleInput.value,
    link: linkInput.value
  })

  elementsCards.prepend(data);
  closePopup(popupAddImage);

  titleInput.value = '';
  linkInput.value = '';
}


//Удаление карточки
function removeCard(evt) {
  const elementClick = evt.target.closest('.element');
  elementClick.remove();
}


// Лайк
function togglelike(evt) {
  evt.target.classList.toggle('element__like__button_active');
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
popup.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
  }});
});


// Закрытия popup при нажатии на Esc
function closePopupEscape(evt) {
  popup.forEach((popup) => {
  if (evt.key === "Escape") {
    closePopup(popup);
  }});
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
