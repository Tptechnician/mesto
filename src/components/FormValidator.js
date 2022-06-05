export class FormValidator {
  constructor(config, form){
    this._config = config;
    this._form = form;
    this._inputList = Array.from(form.querySelectorAll(config.inputSelector));
    this._submitButton = form.querySelector(config.submitButtonSelector);
    this._errorElements = Array.from(form.querySelectorAll('.popup__form-error'));
  };

  //Блокировка кнопки "сохранить"
  _toggleButton(config, form) {
    this._submitButton.disabled = !form.checkValidity();
    this._submitButton.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
  };


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
    this._inputList.forEach((input) => {

      input.addEventListener('input', () => {
        this._isValid(config, form, input)
      });
    });
  };

  //Сброс ошибок в input
  resetValidation(){
    this._errorElements.forEach((errorElement) => {
      errorElement.textContent = '';
    });
    this._inputList.forEach((errorInput) => {
      errorInput.classList.remove('popup__input_type_error');
    });
    this._submitButton.disabled = true;
    this._submitButton.classList.add('popup__save_no-active');
  };

  //Включение валидации
  enableValidation () {
    
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners(this._config, this._form);
    this._toggleButton(this._config, this._form);
  
  };
}

