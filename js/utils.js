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

  var renderResult = function (resultWindow) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(resultWindow);
    window.data.main.appendChild(fragment);
  };

  var closeResult = function (result) {
    window.data.main.removeChild(result);
    document.removeEventListener('keydown', successEscPressHandler);
    document.removeEventListener('keydown', errorEscPressHandler);
    successWindow.removeEventListener('click', successClickHandler);
    errorWindow.removeEventListener('click', errorClickHandler);
  };

  // функция, которая срабатывает при успешной отправке формы
  var sendHandler = function () {
    renderResult(successWindow);
    resetForm();
    form.submitButton.textContent = 'Опубликовать';
  };

  // обработчик событий на кнопку Отправить
  form.submitButton.addEventListener('submit', function (evt) {
    form.submitButton.textContent = 'Данные отправляются...';
    window.backend.save(new FormData(window.data.adForm), sendHandler, window.utils.errorHandler);
    evt.preventDefault();
  });

  errorButton.addEventListener('click', function () {
    closeResult(errorWindow);
  });

  // функция для сброса настроек
  var resetForm = function () {
    window.data.map.classList.add('map--faded');
    window.data.adForm.classList.add('ad-form--disabled');
    window.mode.disabledForm();
    window.data.mainPin.style.left = window.data.MainPinStart.X + 'px';
    window.data.mainPin.style.top = window.data.MainPinStart.Y + 'px';
    window.mode.showAddress();
    window.pin.deletePins();
    window.map.closeModal();
    window.data.activeModeMap = false;
    window.data.adForm.reset();
    window.data.mapFilters.reset();
    window.mode.showAddress();

    document.addEventListener('keydown', successEscPressHandler);
    successWindow.addEventListener('click', successClickHandler);
  };

  form.resetButton.addEventListener('click', function () {
    resetForm();
  });

  document.addEventListener('keydown', successEscPressHandler);
  document.addEventListener('keydown', errorEscPressHandler);
  successWindow.addEventListener('click', successClickHandler);
  errorWindow.addEventListener('click', errorClickHandler);

  window.utils = {
    loadHandler: function (data) {
      window.data.pins = data;
      var pins = window.filter.filterPins(data);
      window.map.closeModal();
      window.pin.renderPins(pins);
    },

    // функция, которая срабатывает при ошибке при отправке формы
    errorHandler: function () {
      renderResult(errorWindow);
      form.submitButton.textContent = 'Опубликовать';
      document.addEventListener('keydown', errorEscPressHandler);
      errorWindow.addEventListener('click', errorClickHandler);
    },
  };

})();
