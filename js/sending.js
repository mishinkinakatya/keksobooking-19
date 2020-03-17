'use strict';
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
      closeSuccessModal();
    }
  };

  var errorEscPressHandler = function (evt) {
    if (evt.key === 'Escape') {
      closeErrorModal();
    }
  };

  var successClickHandler = function () {
    closeSuccessModal();
  };

  var errorClickHandler = function () {
    closeErrorModal();
  };

  var openErrorModal = function () {
    window.data.main.appendChild(errorWindow);
    errorWindow.addEventListener('click', errorClickHandler);
    document.addEventListener('keydown', errorEscPressHandler);
    errorButton.addEventListener('click', errorClickHandler);
  };

  var closeErrorModal = function () {
    errorWindow.remove();
    errorWindow.removeEventListener('click', errorClickHandler);
    document.removeEventListener('keydown', errorEscPressHandler);
    errorButton.removeEventListener('click', errorClickHandler);
  };

  var openSuccessModal = function () {
    window.data.main.appendChild(successWindow);
    successWindow.addEventListener('click', successClickHandler);
    document.addEventListener('keydown', successEscPressHandler);
  };

  var closeSuccessModal = function () {
    successWindow.remove();
    successWindow.removeEventListener('click', errorClickHandler);
    document.removeEventListener('keydown', errorEscPressHandler);
  };

  window.data.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    form.submitButton.textContent = 'Данные отправляются...';
    window.backend.save(new FormData(window.data.adForm), sendRequest, window.errorRequest);
  });

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
    window.pin.delete();
    window.modal.close();
  };

  form.resetButton.addEventListener('click', function () {
    resetForm();
  });

  var sendRequest = function () {
    openSuccessModal();
    resetForm();
    form.submitButton.textContent = 'Опубликовать';
  };

  window.errorRequest = function () {
    openErrorModal();
    form.submitButton.textContent = 'Опубликовать';
  };

})();
