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
    successWindow.removeEventListener('click', errorClickHandler);
  };

  var getPins = function (advertisements) {
    for (var j = 0; j < advertisements.length; j++) {
      if (advertisements[j].offer) {
        window.pin.fragment.appendChild(window.pin.renderPin((advertisements[j])));
      }
    }
  };

  var deletePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      window.data.mapPins.removeChild(pins[i]);
    }
  };

  // функция, которая срабатывает при успешной отправке формы
  var sendHandler = function () {
    renderResult(successWindow);
    resetForm();
    form.submitButton.textContent = 'Сохранить';
    window.backend.load(loadHandler, errorHandler);
  };

  // функция, которая срабатывает при ошибке при отправке формы
  var errorHandler = function () {
    renderResult(errorWindow);
  };

  // функция, которая срабатывает при загрузке данных с сервера
  var loadHandler = function (pins) {
    getPins(pins);
  };

  window.backend.load(loadHandler, errorHandler);

  // обработчик событий на кнопку Отправить
  window.data.adForm.addEventListener('submit', function (evt) {
    form.submitButton.textContent = 'Данные отправляются...';
    window.backend.save(new FormData(window.data.adForm), sendHandler, errorHandler);
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
    window.data.mainPin.style.left = window.data.MAIN_PIN_START.X + 'px';
    window.data.mainPin.style.top = window.data.MAIN_PIN_START.Y + 'px';
    window.mode.showAddress();
    deletePins();
    window.map.closeModal();
    window.data.activeModeMap = false;
    window.data.adForm.reset();
    window.data.mapFilters.reset();
  };

  form.resetButton.addEventListener('click', function () {
    resetForm();
    window.backend.load(loadHandler, errorHandler);
  });

  document.addEventListener('keydown', successEscPressHandler);
  document.addEventListener('keydown', errorEscPressHandler);
  successWindow.addEventListener('click', successClickHandler);
  successWindow.addEventListener('click', errorClickHandler);

})();
