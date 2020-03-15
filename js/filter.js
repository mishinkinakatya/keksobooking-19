'use strict';

(function () {

  var housingType = window.data.mapFilters.querySelector('#housing-type');
  var housingPrice = window.data.mapFilters.querySelector('#housing-price');
  var housingRooms = window.data.mapFilters.querySelector('#housing-rooms');
  var housingGuests = window.data.mapFilters.querySelector('#housing-guests');
  var housingFeatures = window.data.mapFilters.querySelector('#housing-features');
  var availableFeatures = housingFeatures.querySelectorAll('input');

  var features;
  housingFeatures.addEventListener('change', function () {
    var newFeature = availableFeatures.value;
    features = newFeature;
    if (window.data.activeModeMap) {
      window.filter.updatePins();
    }
  });

  var pins = [];
  var price = housingPrice.value;
  var type = housingType.value;
  var rooms = housingRooms.value;
  var guests = housingGuests.value;

  housingPrice.addEventListener('change', function () {
    var newHousePrice = housingPrice.value;
    price = newHousePrice;
    if (window.data.activeModeMap) {
      window.filter.updatePins();
    }
  });

  housingType.addEventListener('change', function () {
    var newHouseType = housingType.value;
    type = newHouseType;
    if (window.data.activeModeMap) {
      window.filter.updatePins();
    }
  });

  housingRooms.addEventListener('change', function () {
    var newHouseRooms = housingRooms.value;
    rooms = newHouseRooms;
    if (window.data.activeModeMap) {
      window.filter.updatePins();
    }
  });

  housingGuests.addEventListener('change', function () {
    var newHouseGuests = housingGuests.value;
    guests = newHouseGuests;
    if (window.data.activeModeMap) {
      window.filter.updatePins();
    }
  });

  // var filterChangeHandler = function (houseFilterValue, houseFilter) {
  //   var newFilter = houseFilter.value;
  //   houseFilterValue = newFilter;
  //   if (window.data.activeModeMap) {
  //     window.filter.updatePins();
  //   }
  // };

  // housingGuests.addEventListener('change', filterChangeHandler(guests, housingGuests));

  window.filter = {
    updatePins: function () {
      window.map.closeModal();
      var sameHousingType = pins.filter(function (it) {
        if (it.offer.type === 'any') {
          return pins;
        } else {
          return it.offer.type === type;
        }
      });
      var sameHousingPrice = pins.filter(function (it) {
        switch (price) {
          case 'low':
            return it.offer.price < 10000;
          case 'middle':
            return it.offer.price >= 10000 && it.offer.price < 50000;
          case 'high':
            return it.offer.price >= 50000;
          default:
            return pins;
        }
      });
      var sameHousingRooms = pins.filter(function (it) {
        if (rooms === 'any') {
          return pins;
        } else {
          return it.offer.rooms.toString() === rooms;
        }
      });
      var sameHousingGuests = pins.filter(function (it) {
        if (guests === 'any') {
          return pins;
        } else {
          return it.offer.guests.toString() === guests;
        }
      });
      var sameHousingFeatures = pins.filter(function (it) {
        if (it.offer.features === features) {
          return it.offer.features === features;
        } else {
          return pins;
        }
      });
      // window.pin.getPins(sameHousingType.concat(sameHousingPrice));
      window.pin.getPins(sameHousingFeatures);
    },
    loadHandler: function (data) {
      pins = data;
      if (window.data.activeModeMap) {
        window.filter.updatePins();
      }
    },
  };
})();
