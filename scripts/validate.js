/*
// Включение валидации форм
function enableValidation (config) {
  const form = Array.from(document.querySelector(config.formSelector));
  console.log(form);
  const inputs = form.querySelectorAll(config.inputSelector);
  
  inputs.forEach(element => {
    element.addEventListener('input', (event) => handleFormInput(event, form, config));
  });

  form.addEventListener('submit', (event) => handleFormSubmit(event, form));

  toggleButton(form, config);
}

// Обработка событий валидации форм
function handleFormSubmit(event, form) {
  event.preventDefault();
}

//
function handleFormInput(event, form, config) {
  const input = event.target;
  const errorInput = document.querySelector(`#${input.id}-error`);

  if (input.validity.valid) {
    errorInput.textContent = '';
  } else {
    errorInput.textContent = input.validationMessage;
  }

  toggleButton(form, config);
}

//Блокировка кнопки
function toggleButton(form, config) {
  const button = document.querySelector(config.submitButtonSelector);
  button.disabled = !form.checkValidity();
  button.classList.toggle('popup__save_no-active', !form.checkValidity());
}



enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  //inactiveButtonClass: 'popup__button_disabled',
  //inputErrorClass: 'popup__input_type_error',
  //errorClass: 'popup__error_visible'
});*/
/*
function toggleButton(config, form) {
  const button = document.querySelector(config.submitButtonSelector);
  
  button.disabled = !form.checkValidity();
  button.classList.toggle('popup__save_no-active', !form.checkValidity());
}
toggleButton(config, form);*/
//

function showInputError(form, input, errorMessage) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
};

function hideInputError(form, input) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
};


function isValid(form, input) {
  
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }

}; 

function setEventListeners(config, form) {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  
  // Обойдём все элементы полученной коллекции
  
  inputList.forEach((input) => {
    // каждому полю добавим обработчик события input
    input.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(form, input)
    });
  });
};


function enableValidation (config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    
    setEventListeners(config, form);
    
  });
  
}

 

enableValidation ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  //inactiveButtonClass: 'popup__button_disabled',
  //inputErrorClass: 'popup__input_type_error',
  //errorClass: 'popup__error_visible'
});


