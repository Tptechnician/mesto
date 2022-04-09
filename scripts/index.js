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

  description.textContent = element.name;
  image.src = element.link;

  deleteButton.addEventListener('click', removeCard);

  return getElementTemplate;
}

function removeCard(evt) {
  const elementClick = evt.target.closest('.element');
  elementClick.remove();
}

// Код для добавления карточки 
function formSubmitAddImage (evt) {
  evt.preventDefault();
  const elementTemplate = document.querySelector('#element-template').content;
  const elementsCards = document.querySelector('.elements__cards');
  const li = elementTemplate.querySelector('.element').cloneNode(true);
  
  li.querySelector('.element__description').textContent = titleInput.value;
  li.querySelector('.element__image').src = linkInput.value;

  elementsCards.prepend(li);
  togglePopupAddImage();

  titleInput.value = '';
  linkInput.value = '';
}

formAddImage.addEventListener('submit', formSubmitAddImage);

// код для открытия закрытия popup
let profileEditButton = document.querySelector('.profile__edit-button');
let profileAddButton = document.querySelector('.profile__add-button');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let popupCloseAddImage = document.querySelector('#button-close-add-image');
let popupAddImage = document.querySelector('#add-image');

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

// Код для открытия закрытия popup добавления карточек
function togglePopupAddImage() {
  popupAddImage.classList.toggle('popup_opened');
}

profileAddButton.addEventListener('click', togglePopupAddImage);
popupCloseAddImage.addEventListener('click', togglePopupAddImage);


/* Код для закрытия popup при клике по overlay
function overlayclick(event) {
    if (event.target === event.currentTarget) {
        togglepopup();
    }
}

popup.addEventListener('click', overlayclick);*/

//Переменные для popup
let form = document.forms.formpopup;
let nameInput = form.elements.inputname;
let jobInput = form.elements.inputactivity;
let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity');

// Функция для редактирования profile__name и profile__activity
function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileActivity.textContent = jobInput.value;

    togglePopup();
}

form.addEventListener('submit', formSubmitHandler);