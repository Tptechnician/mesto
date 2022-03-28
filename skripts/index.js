let profileeditbutton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupclose = popup.querySelector('.popup__close');


function togglepopup() {
    popup.classList.toggle('popup_opened');
}

profileeditbutton.addEventListener('click', togglepopup);

popupclose.addEventListener('click', togglepopup);


/* Код для закрытия popup при клике по overlay
function overlayclick(event) {
    if (event.target === event.currentTarget) {
        togglepopup();
    }
}

popup.addEventListener('click', overlayclick);*/

let form = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__activity');

/*
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

function onsave(e) {

}

form.addEventListener('submit', onsave);*/