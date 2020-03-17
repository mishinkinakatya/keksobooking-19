'use strict';
(function () {

  var adFormFieldset = window.data.adForm.querySelectorAll('fieldset');
  var mapFiltersSelect = window.data.mapFilters.querySelectorAll('select');
  var mapFiltersFieldset = window.data.mapFilters.querySelectorAll('fieldset');

  var tuneDisabled = function (target, mode) {
    for (var i = 0; i < target.length; i++) {
      target[i].disabled = mode;
    }
    return target;
  };

  var loadRequest = function (data) {
    window.data.pins = data;
    var pins = window.filter.filterPins(data);
    window.modal.close();
    window.pin.render(pins);
  };

  window.mode = {
    activateForm: function () {
      window.data.activeModeMap = true;
      window.showAddress();
      window.data.map.classList.remove('map--faded');
      window.data.adForm.classList.remove('ad-form--disabled');
      tuneDisabled(adFormFieldset, false);
      tuneDisabled(mapFiltersSelect, false);
      tuneDisabled(mapFiltersFieldset, false);

      window.backend.load(loadRequest, window.errorRequest);

      window.data.mapFilters.addEventListener('change', window.debounce(function () {
        window.backend.load(loadRequest, window.errorRequest);
      }));
    },

    disabledForm: function () {
      tuneDisabled(adFormFieldset, true);
      tuneDisabled(mapFiltersSelect, true);
      tuneDisabled(mapFiltersFieldset, true);
    },
  };

  window.mode.disabledForm();
})();
