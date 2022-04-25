const elementsCards = document.querySelector('.elements__cards');
const elementTemplate = document.querySelector('.element-template');
const profileAddButton = document.querySelector('.profile__add-button');
const formAddImage = document.forms.formpopupaddimage;
const titleInput = formAddImage.elements.inputtitle;
const linkInput = formAddImage.elements.inputlink;
const popupViewImage = document.querySelector('.popup__viewimage');
const popupImage = document.querySelector('.popup__image');
const popupTitleViewImage = document.querySelector('.popup__title_viewimage');
const popupCloseViewImage = document.querySelector('.close-viewimage');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup__rofile');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close');
const popupAddImage = document.querySelector('.popup__addimage');
const popupCloseAddImage = document.querySelector('.close-add-image');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const formPopupProfile = document.forms.formPopup;
const nameInput = formPopupProfile.elements.inputname;
const jobInput = formPopupProfile.elements.inputactivity;


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
  const deleteButton = template.querySelector('.element__delete-button');
  const buttonLike = template.querySelector('.element__like-button');
    
  description.textContent = element.name;
  image.src = element.link;
  image.alt = element.name;

  formAddImage.addEventListener('submit', submitAddImageForm);
  deleteButton.addEventListener('click', removeCard);
  buttonLike.addEventListener('click', togglelike);
  image.addEventListener('click', () => openPopupViewImage(element));
  
  return template;
}

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

//Просмотр img из карточки
function openPopupViewImage(element) {

  popupImage.src = element.link;
  popupImage.alt = element.name; 
  popupTitleViewImage.textContent = element.name;

  togglePopup(popupViewImage);
}

popupCloseViewImage.addEventListener('click', () => togglePopup(popupViewImage));


//Открытие, закрытие popup добавления карточки
profileAddButton.addEventListener('click', () => {
  resetError ();
  togglePopup(popupAddImage)
});
popupCloseAddImage.addEventListener('click', () => {
  titleInput.value = '';
  linkInput.value = '';
  togglePopup(popupAddImage)
});


//Добавление новой карточки
function submitAddImageForm (evt) {
  evt.preventDefault();

  let data = getCard({
    name: titleInput.value,
    link: linkInput.value
  })

  elementsCards.prepend(data);
  togglePopup(popupAddImage);

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
  evt.target.classList.toggle('element__like-button_active');
}


//Открытие, закрытие popup редоктирования профиля
profileEditButton.addEventListener('click', () => handleOpenProfilePopup());

function handleOpenProfilePopup() {
  resetError ();
  nameInput.value = profileName.textContent;
  jobInput.value = profileActivity.textContent;

  togglePopup(popupProfile)
}

popupProfileCloseButton.addEventListener('click', () => togglePopup(popupProfile));


//submit формы редоктирования профиля
function submitHandlerform (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileActivity.textContent = jobInput.value;

    togglePopup(popupProfile);
}

formPopupProfile.addEventListener('submit', submitHandlerform);

//Закрытия popup при клике по overlay и нажатия на Esc
const popup = Array.from(document.querySelectorAll('.popup'));

popup.forEach((popup) => {

  document.addEventListener('keydown', (evt) => {
    if (evt.key === "Escape" && popup.classList.contains('popup_opened')) {
      togglePopup(popup);
      titleInput.value = '';
      linkInput.value = '';
  }});

  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      togglePopup(popup);
      titleInput.value = '';
      linkInput.value = '';
  }});
});