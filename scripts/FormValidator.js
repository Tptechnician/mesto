export class FormValidator {
  constructor(config, form){
    this._config = config;
    this._form = form;
  }

  //Блокировка кнопки "сохранить"
  _toggleButton(config, form) {
    const button = form.querySelector(config.submitButtonSelector);
    button.disabled = !form.checkValidity();
    button.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
  }


  //Добавление сообщения об ошибке
  _showInputError(config, form, input, errorMessage) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
  };


  //Удаление сообщения об ошибке
  _hideInputError(config, form, input) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
  };


  //Проверка на валидность input
  _isValid(config, form, input) {
  
    if (!input.validity.valid) {
      this._showInputError(config, form, input, input.validationMessage);
    } else {
      this._hideInputError(config, form, input);
    }
    this._toggleButton(config, form);
  }; 

  //Выбор всех input для валидации
  _setEventListeners(config, form) {    
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    
    inputList.forEach((input) => {

      input.addEventListener('input', () => {
        this._isValid(config, form, input)
      });
    });
  };

  //Включение валидации
  enableValidation () {
    
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners(this._config, this._form);
    this._toggleButton(this._config, this._form);
  
  }
}

/*enableValidation ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_no-active',
  inputErrorClass: 'popup__input_type_error'
});*/