'use strict';
(function () {

  var adFormFieldsets = window.data.adForm.querySelectorAll('fieldset');
  var mapFiltersSelects = window.data.mapFilters.querySelectorAll('select');
  var mapFiltersFieldsets = window.data.mapFilters.querySelectorAll('fieldset');

  var tuneDisabled = function (target, mode) {
    target.forEach(function (targetItem) {
      targetItem.disabled = mode;
    });
  };

  var loadRequest = function (data) {
    var notEmptyPins = data.filter(function (item) {
      return !!item.offer;
    });
    var pins = window.filter.filterPins(notEmptyPins);
    window.modal.close();
    window.pin.render(pins);
  };

  window.mode = {
    activateForm: function () {
      window.data.activeModeMap = true;
      window.showAddress();
      window.data.map.classList.remove('map--faded');
      window.data.adForm.classList.remove('ad-form--disabled');
      tuneDisabled(adFormFieldsets, false);
      tuneDisabled(mapFiltersSelects, false);
      tuneDisabled(mapFiltersFieldsets, false);

      window.backend.load(loadRequest, window.errorRequest);

      window.data.mapFilters.addEventListener('change', window.debounce(function () {
        window.backend.load(loadRequest, window.errorRequest);
      }));
    },

    disableForm: function () {
      tuneDisabled(adFormFieldsets, true);
      tuneDisabled(mapFiltersSelects, true);
      tuneDisabled(mapFiltersFieldsets, true);
    },
  };

  window.mode.disableForm();
})();
