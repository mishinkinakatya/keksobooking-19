'use strict';
(function () {

  var fieldsetadForm = window.map.adForm.querySelectorAll('fieldset');
  var mapFilters = window.data.map.querySelector('.map__filters');
  var mapFiltersSelect = mapFilters.querySelectorAll('select');
  var mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');
  var address = window.map.adForm.querySelector('#address');

  // Функция для переключения страницы между активным и неактивным состояниями
  var tuneDisabled = function (target, mode) {
    for (var d = 0; d < target.length; d++) {
      target[d].disabled = mode;
    }
    return target;
  };

  // переключение в НЕактивный режим
  var disabledForm = function () {
    tuneDisabled(fieldsetadForm, true);
    tuneDisabled(mapFiltersSelect, true);
    tuneDisabled(mapFiltersFieldset, true);
    // address.setAttribute('placeholder', mainPinCoords.x + ', ' + mainPinCoords.centerY);
  };

  disabledForm();

  window.mode = {
    // переключение в активный режим
    activateForm: function () {
      window.data.map.classList.remove('map--faded');
      window.map.adForm.classList.remove('ad-form--disabled');
      tuneDisabled(fieldsetadForm, false);
      tuneDisabled(mapFiltersSelect, false);
      tuneDisabled(mapFiltersFieldset, false);

      window.data.mapPins.appendChild(window.pin.fragment);
      window.data.activeModeMap = true;
    },
    showAddress: function () {
      var pinCoordsX = Math.floor(window.data.mainPin.offsetLeft + window.data.MAIN_PIN_SIZE.WIDTH / 2);
      var pinCoordsY;
      if (window.data.activeModeMap) {
        pinCoordsY = Math.floor(window.data.mainPin.offsetTop + window.data.MAIN_PIN_SIZE.HEIGHT + window.data.MAIN_PIN_SIZE.POINTER_HEIGHT);
      } else {
        pinCoordsY = Math.floor(window.data.mainPin.offsetTop + window.data.MAIN_PIN_SIZE.HEIGHT);
      }
      address.value = pinCoordsX + ', ' + pinCoordsY;
    },
  };

  window.mode.showAddress();
})();
