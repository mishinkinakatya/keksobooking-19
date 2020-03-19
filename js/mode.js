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
    window.data.pins = data.filter(function (item) {
      return !!item.offer;
    });
    window.pin.render(window.data.pins);
    tuneDisabled(mapFiltersSelects, false);
    tuneDisabled(mapFiltersFieldsets, false);
  };

  window.mode = {
    activateForm: function () {
      window.backend.load(loadRequest, window.errorRequest);

      window.data.activeModeMap = true;
      window.showAddress();
      window.data.map.classList.remove('map--faded');
      window.data.adForm.classList.remove('ad-form--disabled');
      tuneDisabled(adFormFieldsets, false);

      window.data.mapFilters.addEventListener('change', window.debounce(function () {
        var pinsFilter = window.filter.filterPins(window.data.pins);
        window.modal.close();
        window.pin.render(pinsFilter);
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
