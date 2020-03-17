'use strict';
// настройка полей в форме для создания объявления
(function () {

  var form = {
    submitButton: window.data.adForm.querySelector('.ad-form__submit'),
    resetButton: window.data.adForm.querySelector('.ad-form__reset'),
  };

  var successWindow = document.querySelector('#success').content.querySelector('.success');
  var errorWindow = document.querySelector('#error').content.querySelector('.error');
  var errorButton = errorWindow.querySelector('.error__button');

  var successEscPressHandler = function (evt) {
    if (evt.key === 'Escape') {
      closeResult(successWindow);
    }
  };

  var errorEscPressHandler = function (evt) {
    if (evt.key === 'Escape') {
      closeResult(errorWindow);
    }
  };

  var successClickHandler = function () {
    closeResult(successWindow);
  };

  var errorClickHandler = function () {
    closeResult(errorWindow);
  };

  // функция, которая срабатывает при успешной отправке формы
  var sendRequest = function () {
    renderResult(successWindow);
    resetForm();
    form.submitButton.textContent = 'Опубликовать';
  };

  var renderResult = function (resultWindow) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(resultWindow);
    window.data.main.appendChild(fragment);
    document.addEventListener('keydown', successEscPressHandler);
    document.addEventListener('keydown', errorEscPressHandler);
    successWindow.addEventListener('click', successClickHandler);
    errorWindow.addEventListener('click', errorClickHandler);
  };

  var closeResult = function (result) {
    window.data.main.removeChild(result);
    document.removeEventListener('keydown', successEscPressHandler);
    document.removeEventListener('keydown', errorEscPressHandler);
    successWindow.removeEventListener('click', successClickHandler);
    errorWindow.removeEventListener('click', errorClickHandler);
  };

  var resetForm = function () {
    window.data.activeModeMap = false;
    window.data.map.classList.add('map--faded');
    window.data.adForm.classList.add('ad-form--disabled');
    window.data.adForm.reset();
    window.data.mapFilters.reset();
    window.data.mainPin.style.left = window.data.MainPinStart.X + 'px';
    window.data.mainPin.style.top = window.data.MainPinStart.Y + 'px';
    window.mode.disabledForm();
    window.showAddress();
    window.pin.deletePins();
    window.modal.closeModal();

    document.addEventListener('keydown', successEscPressHandler);
    successWindow.addEventListener('click', successClickHandler);
  };

  window.data.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    form.submitButton.textContent = 'Данные отправляются...';
    window.backend.save(new FormData(window.data.adForm), sendRequest, window.errorRequest);
  });

  errorButton.addEventListener('click', function () {
    closeResult(errorWindow);
  });

  form.resetButton.addEventListener('click', function () {
    resetForm();
  });

  // функция, которая срабатывает при ошибке при отправке формы
  window.errorRequest = function () {
    renderResult(errorWindow);
    form.submitButton.textContent = 'Опубликовать';
    document.addEventListener('keydown', errorEscPressHandler);
    errorWindow.addEventListener('click', errorClickHandler);
  };

})();
