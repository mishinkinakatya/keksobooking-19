'use strict';
(function () {

  var fieldsetadForm = window.data.adForm.querySelectorAll('fieldset');
  var mapFilters = window.data.map.querySelector('.map__filters');
  var mapFiltersSelect = mapFilters.querySelectorAll('select');
  var mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');
  var address = window.data.adForm.querySelector('#address');

  // Функция для переключения страницы между активным и неактивным состояниями
  var tuneDisabled = function (target, mode) {
    for (var d = 0; d < target.length; d++) {
      target[d].disabled = mode;
    }
    return target;
  };

  window.mode = {
    // переключение в активный режим
    activateForm: function () {
      window.data.map.classList.remove('map--faded');
      window.data.adForm.classList.remove('ad-form--disabled');
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
    // переключение в НЕактивный режим
    disabledForm: function () {
      tuneDisabled(fieldsetadForm, true);
      tuneDisabled(mapFiltersSelect, true);
      tuneDisabled(mapFiltersFieldset, true);
    },
  };

  window.mode.disabledForm();

  window.mode.showAddress();
})();
