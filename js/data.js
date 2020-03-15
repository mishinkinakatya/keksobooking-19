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

    MainPinSize: {
      WIDTH: 65,
      HEIGHT: 65,
      POINTER_HEIGHT: 22,
    },

    MainPinStart: {
      X: 570,
      Y: 375,
    },

    activeModeMap: false,
  };
})();
