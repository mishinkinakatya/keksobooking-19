'use strict';
(function () {
  window.data = {
    map: document.querySelector('.map'),
    mapPins: document.querySelector('.map__pins'),
    mainPin: document.querySelector('.map__pin--main'),
    main: document.querySelector('main'),
    adForm: document.querySelector('.ad-form'),
    mapFilters: document.querySelector('.map__filters'),
    pins: [],

    MainPinStart: {
      X: 570,
      Y: 375,
    },

    activeModeMap: false,
  };
})();
