'use strict';
(function () {

  var fieldsetadForm = window.data.adForm.querySelectorAll('fieldset');
  var mapFiltersSelect = window.data.mapFilters.querySelectorAll('select');
  var mapFiltersFieldset = window.data.mapFilters.querySelectorAll('fieldset');

  // Функция для переключения страницы между активным и неактивным состояниями
  var tuneDisabled = function (target, mode) {
    for (var d = 0; d < target.length; d++) {
      target[d].disabled = mode;
    }
    return target;
  };

  var loadRequest = function (data) {
    window.data.pins = data;
    var pins = window.filter.filterPins(data);
    window.modal.closeModal();
    window.pin.renderPins(pins);
  };

  window.mode = {
    // переключение в активный режим
    activateForm: function () {
      window.data.activeModeMap = true;
      window.showAddress();
      window.data.map.classList.remove('map--faded');
      window.data.adForm.classList.remove('ad-form--disabled');
      tuneDisabled(fieldsetadForm, false);
      tuneDisabled(mapFiltersSelect, false);
      tuneDisabled(mapFiltersFieldset, false);
      window.backend.load(loadRequest, window.errorRequest);
      window.data.mapFilters.addEventListener('change', window.debounce(function () {
        window.backend.load(loadRequest, window.errorRequest);
      }));
    },
    // переключение в НЕактивный режим
    disabledForm: function () {
      tuneDisabled(fieldsetadForm, true);
      tuneDisabled(mapFiltersSelect, true);
      tuneDisabled(mapFiltersFieldset, true);
    },
  };

  window.mode.disabledForm();
})();
