const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Загрузка первых 6 карточек
const elementsCards = document.querySelector('.elements__cards');
const elementTemplate = document.querySelector('.element-template');
const profileAddButton = document.querySelector('.profile__add-button');
const formAddImage = document.forms.formpopupaddimage;
const titleInput = formAddImage.elements.inputtitle;
const linkInput = formAddImage.elements.inputlink;
const popupViewImage = document.querySelector('.viewimage');
const popupImage = document.querySelector('.popup__image');
const popupTitleViewImage = document.querySelector('.popup__title_viewimage');
const popupCloseViewImage = document.querySelector('.close-viewimage');
const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const popupAddImage = document.querySelector('.addimage');
const popupCloseAddImage = document.querySelector('.close-add-image');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const form = document.forms.formpopup;
const nameInput = form.elements.inputname;
const jobInput = form.elements.inputactivity;

//Загрузка карточек при загрузке страницы
function addCards() {
  const cards = initialCards.map(getElement);
  elementsCards.prepend(...cards);
}

addCards();

function getElement(element) {
  const getElementTemplate = elementTemplate.content.cloneNode(true);
  const description = getElementTemplate.querySelector('.element__description');
  const image = getElementTemplate.querySelector('.element__image');
  const deleteButton = getElementTemplate.querySelector('.element__delete-button');
  const buttonLike = getElementTemplate.querySelector('.element__like-button');
    
  description.textContent = element.name;
  image.src = element.link;
  image.alt = element.name;

  formAddImage.addEventListener('submit', formSubmitAddImage);
  deleteButton.addEventListener('click', removeCard);
  buttonLike.addEventListener('click', like);
  image.addEventListener('click', () => togglePopupViewImage(element));
  
  return getElementTemplate;
}


//Просмотр img из карточки
function togglePopupViewImage (element) {
  popupViewImage.classList.toggle('popup_opened');

  if (popupViewImage.classList.contains('popup_opened') === true){
    popupImage.src = element.link;
    popupTitleViewImage.textContent = element.name;
    popupImage.alt = element.name
  }
}

popupCloseViewImage.addEventListener('click', togglePopupViewImage);


//Добавление новой карточки
function formSubmitAddImage (evt) {
  evt.preventDefault();

  let data = getElement({
    name: `${titleInput.value}`,
    link: `${linkInput.value}`
  })

  elementsCards.prepend(data);
  togglePopupAddImage();

  titleInput.value = '';
  linkInput.value = '';
}


//Удаление карточки
function removeCard(evt) {
  const elementClick = evt.target.closest('.element');
  elementClick.remove();
}


// Лайк
function like(evt) {
  evt.target.classList.toggle('element__like-button_active');
}


//Открытие popup редоктирования профиля
function togglePopup() {
    popup.classList.toggle('popup_opened');
    function substitute() {
        if (popup.classList.contains('popup_opened') === true){
            nameInput.value = profileName.textContent;
            jobInput.value = profileActivity.textContent;
        }

    }
    substitute();
}

profileEditButton.addEventListener('click', togglePopup);
popupClose.addEventListener('click', togglePopup);


//Открытие popup добавления карточки
function togglePopupAddImage() {
  popupAddImage.classList.toggle('popup_opened');
}

profileAddButton.addEventListener('click', togglePopupAddImage);
popupCloseAddImage.addEventListener('click', togglePopupAddImage);

//submit формы редоктирования профиля
function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileActivity.textContent = jobInput.value;

    togglePopup();
}

form.addEventListener('submit', formSubmitHandler);

 /*//Код для закрытия popup при клике по overlay
function overlayclick(event) {
    if (event.target === event.currentTarget) {
        togglepopup();
        togglePopupAddImage();
    }
}

popup.addEventListener('click', overlayclick);*/



