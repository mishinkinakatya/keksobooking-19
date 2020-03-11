'use strict';
(function () {
  window.data = {
    map: document.querySelector('.map'),
    mapPins: document.querySelector('.map__pins'),
    mainPin: document.querySelector('.map__pin--main'),

    MAIN_PIN_SIZE: {
      WIDTH: 65,
      HEIGHT: 65,
      POINTER_HEIGHT: 22,
    },

    MAIN_PIN_START: {
      X: 570,
      Y: 375,
    },

    activeModeMap: false,
  };
})();
