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

  // var successClickHandler = function () {
  //   closeResult(successWindow);
  // };

  // var errorClickHandler = function () {
  //   closeResult(errorWindow);
  // };

  var renderResult = function (resultWindow) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(resultWindow);
    window.data.main.appendChild(fragment);
  };

  var closeResult = function (result) {
    window.data.main.removeChild(result);
    document.removeEventListener('keydown', successEscPressHandler);
    document.removeEventListener('keydown', errorEscPressHandler);
    // document.removeEventListener('click', successClickHandler);
    // document.removeEventListener('click', errorClickHandler);
  };

  // функция, которая срабатывает при успешной отправке формы
  var sendHandler = function () {
    renderResult(successWindow);
    window.mode.disabledForm();
    form.submitButton.textContent = 'Сохранить';
  };

  // функция, которая срабатывает при ошибке при отправке формы
  var errorHandler = function () {
    renderResult(errorWindow);
  };

  // функция, которая срабатывает при загрузке данных с сервера
  var loadHandler = function (advertisements) {
    for (var j = 0; j < advertisements.length; j++) {
      if (advertisements[j].offer) {
        window.pin.fragment.appendChild(window.pin.renderPin((advertisements[j])));
      }
    }
  };

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
  var resetSettings = function () {
    window.mode.disabledForm();
  };

  form.resetButton.addEventListener('click', function () {
    resetSettings();
  });

  document.addEventListener('keydown', successEscPressHandler);
  document.addEventListener('keydown', errorEscPressHandler);
  // document.addEventListener('click', successClickHandler);
  // document.addEventListener('click', errorClickHandler);

  window.backend.load(loadHandler, errorHandler);
})();
