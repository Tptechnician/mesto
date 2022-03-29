// код для открытие закрытие popup
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
//Переменные для popup
let form = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__activity');
let profilename = document.querySelector('.profile__name');
let profileactivity = document.querySelector('.profile__activity');

// Код для того что-бы при открытии popup в Input были значения из profile__name и profile__activity
nameInput.value = profilename.textContent;
jobInput.value = profileactivity.textContent;

// Функция для редактирования profile__name и profile__activity
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    profilename.textContent = nameInput.value;
    profileactivity.textContent = jobInput.value;

    togglepopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
form.addEventListener('submit', formSubmitHandler);