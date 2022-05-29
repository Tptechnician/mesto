const popupImage = document.querySelector('.popup__image');
const popupTitleViewImage = document.querySelector('.popup__title_viewimage');
const popupViewImage = document.querySelector('.popup_type_viewimage');

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

// Закрытия popup при нажатии на Esc
function closePopupEscape(evt) {
    if (evt.key === "Escape") {
      const popupOpened = document.querySelector('.popup_opened');
      closePopup(popupOpened);
    };
  }

export {popupImage, popupTitleViewImage, popupViewImage, openPopup, closePopup};