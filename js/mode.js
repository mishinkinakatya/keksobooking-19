'use strict';
(function () {

  window.mode = {
    mainPin: window.data.map.querySelector('.map__pin--main'),
    // переключение в активный режим
    activateForm: function () {
      window.data.map.classList.remove('map--faded');
      window.map.adForm.classList.remove('ad-form--disabled');
      tuneDisabled(fieldsetadForm, false);
      tuneDisabled(mapFiltersSelect, false);
      tuneDisabled(mapFiltersFieldset, false);
      address.setAttribute('placeholder', mainPinCoords.x + ', ' + mainPinCoords.y);

      window.data.mapPins.appendChild(window.pin.fragment);
    },
  };

  var fieldsetadForm = window.map.adForm.querySelectorAll('fieldset');
  var address = window.map.adForm.querySelector('#address');
  var mapFilters = window.data.map.querySelector('.map__filters');
  var mapFiltersSelect = mapFilters.querySelectorAll('select');
  var mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');
  // научиться вычислять указатель
  var mainPinCoords = {
    x: window.mode.mainPin.offsetWidth / 2,
    y: window.mode.mainPin.offsetHeight,
    centerY: window.mode.mainPin.offsetHeight / 2,
  };

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
    address.setAttribute('placeholder', mainPinCoords.x + ', ' + mainPinCoords.centerY);
  };

  disabledForm();
})();
