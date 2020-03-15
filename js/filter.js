'use strict';

(function () {

  var housingType = window.data.mapFilters.querySelector('#housing-type');
  var housingPrice = window.data.mapFilters.querySelector('#housing-price');
  var housingRooms = window.data.mapFilters.querySelector('#housing-rooms');
  var housingGuests = window.data.mapFilters.querySelector('#housing-guests');
  var housingFeatures = window.data.mapFilters.querySelectorAll('#housing-features input');

  var filterPrice = function (price, itemPrice) {
    switch (price) {
      case 'low':
        return itemPrice < 10000;
      case 'middle':
        return itemPrice >= 10000 && itemPrice < 50000;
      case 'high':
        return itemPrice >= 50000;
      default:
        return true;
    }
  };

  var checkedFeatures = function () {
    var checkedFeature = [];
    for (var i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i].checked) {
        checkedFeature.push(housingFeatures[i].value);
      }
    }
    return checkedFeature;
  };

  var filterFeatures = function (features, itemFeatures) {
    for (var j = 0; j < features.length; j++) {
      if (itemFeatures.indexOf(features[j]) === -1) {
        return false;
      }
    }
    return true;
  };

  var filterPins = function (pins) {
    var params = {
      type: housingType.value,
      price: housingPrice.value,
      rooms: housingRooms.value,
      guests: housingGuests.value,
      features: housingFeatures.value,
    };
    return pins.filter(function (item) {
      if (params.type !== 'any' && item.offer.type !== params.type) {
        return false;
      }
      if (!filterPrice(params.price, item.offer.price)) {
        return false;
      }
      if (params.rooms !== 'any' && item.offer.rooms.toString() !== params.rooms) {
        return false;
      }
      if (params.guests !== 'any' && item.offer.guests.toString() !== params.guests) {
        return false;
      }
      if (!filterFeatures(checkedFeatures(), item.offer.features)) {
        return false;
      }
      return true;
    });
  };

  window.filter = {
    filterPins: filterPins,
  };

})();
