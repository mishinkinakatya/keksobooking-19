'use strict';
(function () {
  window.data = {
    map: document.querySelector('.map'),
    mapPins: document.querySelector('.map__pins'),
    mainPin: document.querySelector('.map__pin--main'),
    main: document.querySelector('main'),
    adForm: document.querySelector('.ad-form'),
    mapFilters: document.querySelector('.map__filters'),

    MainPinStart: {
      X: 570,
      Y: 375,
    },

    MainPinSize: {
      WIDTH: 65,
      HEIGHT: 65,
      HEIGHT_WITH_POINTER: 87,
    },

    activeModeMap: false,
  };
})();
