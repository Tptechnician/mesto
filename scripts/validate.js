//Блокировка кнопки "сохранить"
function toggleButton(config, form) {
  const button = form.querySelector(config.submitButtonSelector);
  button.disabled = !form.checkValidity();
  button.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
}


//Добавление сообщения об ошибке
function showInputError(config, form, input, errorMessage) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
};


//Удаление сообщения об ошибке
function hideInputError(config, form, input) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
};


//Проверка на валидность input
function isValid(config, form, input) {
  
  if (!input.validity.valid) {
    showInputError(config, form, input, input.validationMessage);
  } else {
    hideInputError(config, form, input);
  }
  toggleButton(config, form);
}; 


//Выбор всех input для валидации
function setEventListeners(config, form) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));

  inputList.forEach((input) => {

    input.addEventListener('input', () => {
      isValid(config, form, input)
    });
  });
};


//Включение валидации
function enableValidation (config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(config, form);
    toggleButton(config, form);
  });
}

enableValidation ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_no-active',
  inputErrorClass: 'popup__input_type_error'
});
