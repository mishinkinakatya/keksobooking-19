'use strict';

(function () {

  var housingType = window.data.mapFilters.querySelector('#housing-type');
  var pins = [];


  var type;
  housingType.addEventListener('change', function () {
    var newHouseType = housingType.value;
    type = newHouseType;
    if (window.data.activeModeMap) {
      window.filter.updatePins();
    }
  });

  window.filter = {
    updatePins: function () {
      window.map.closeModal();
      var sameHousingType = pins.filter(function (it) {
        if (it.offer.type === housingType.value) {
          return pins;
        } else {
          return it.offer.type === type;
        }
      });
      window.pin.getPins(sameHousingType.concat(pins));
    },
    loadHandler: function (data) {
      pins = data;
      if (window.data.activeModeMap) {
        window.filter.updatePins();
      }
    },
  };
})();
