'use strict';
(function () {
  window.data = {
    accommodationParameters: {
      types: ['palace', 'flat', 'house', 'bungalo'],
      checkinTimes: ['12:00', '13:00', '14:00'],
      checkoutTimes: ['12:00', '13:00', '14:00'],
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    },

    generateRandomNumbers: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    map: document.querySelector('.map'),
    mapPins: document.querySelector('.map__pins'),
  };
})();
