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
const elementTemplate = document.querySelector('#element-template');
let formAddImage = document.forms.formpopupaddimage;
let titleInput = formAddImage.elements.inputtitle;
let linkInput = formAddImage.elements.inputlink;
let profileEditButton = document.querySelector('.profile__edit-button');
let profileAddButton = document.querySelector('.profile__add-button');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let popupCloseAddImage = document.querySelector('#button-close-add-image');
let popupAddImage = document.querySelector('#add-image');
let form = document.forms.formpopup;
let nameInput = form.elements.inputname;
let jobInput = form.elements.inputactivity;
let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity');
let popupViewImage = document.querySelector('.popup__view-image');


const popupCloseViewImage = document.querySelector('.button-close-view-image');

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
  
  formAddImage.addEventListener('submit', formSubmitAddImage);
  deleteButton.addEventListener('click', removeCard);
  buttonLike.addEventListener('click', like);
  image.addEventListener('click', togglePopupViewImage);
  description.addEventListener('click', togglePopupViewImage);
  return getElementTemplate;
  
}

let popupImage = document.querySelector('.popup__image');
let popupTitleViewImage = document.querySelector('.popup__title__view-image');
const description = document.querySelector('.element__description');
const image = document.querySelector('.element__image');

function togglePopupViewImage (evt) {
  popupViewImage.classList.toggle('popup_opened');
  const src = this.currentSrc;
  popupImage.src = src;
  popupTitleViewImage.textContent = description.textContent;
  
}

popupCloseViewImage.addEventListener('click', togglePopupViewImage);

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


function removeCard(evt) {
  const elementClick = evt.target.closest('.element');
  elementClick.remove();
}

function like(evt) {
  evt.target.classList.toggle('element__like-button_active');
}


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

function togglePopupAddImage() {
  popupAddImage.classList.toggle('popup_opened');
}

profileAddButton.addEventListener('click', togglePopupAddImage);
popupCloseAddImage.addEventListener('click', togglePopupAddImage);



function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileActivity.textContent = jobInput.value;

    togglePopup();
}

form.addEventListener('submit', formSubmitHandler);

/* Код для закрытия popup при клике по overlay
function overlayclick(event) {
    if (event.target === event.currentTarget) {
        togglepopup();
    }
}

popup.addEventListener('click', overlayclick);*/



