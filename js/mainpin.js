'use strict';
(function () {
  var MAP_SIZE = {
    MIN_X: -32,
    MAX_X: 1168,
    MIN_Y: 130,
    MAX_Y: 630,
  };

  var limitMove = function (x, min, max) {
    if (x < min) {
      x = min;
    } else if (x > max) {
      x = max;
    } else {
      x = x;
    }
    return x;
  };

  var calculatePinCoords = function (shift) {
    var mainPinCoords = {
      x: limitMove(window.data.mainPin.offsetLeft - shift.x, MAP_SIZE.MIN_X, MAP_SIZE.MAX_X),
      y: limitMove(window.data.mainPin.offsetTop - shift.y, MAP_SIZE.MIN_Y, MAP_SIZE.MAX_Y),
    };

    window.data.mainPin.style.left = mainPinCoords.x + 'px';
    window.data.mainPin.style.top = mainPinCoords.y + 'px';
    window.mode.showAddress();
  };

  window.data.mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.mode.activateForm();
    }
  });

  window.data.mainPin.addEventListener('mousedown', function (evt) {
    if (!window.data.activeModeMap) {
      if (evt.which.toString() === '1') {
        window.mode.activateForm();
      }
    } else {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var mouseMoveHandler = function (moveEvt) {

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        calculatePinCoords(shift);
      };

      var mouseUpHandler = function () {
        var shift = {
          x: 0,
          y: 0,
        };
        calculatePinCoords(shift);
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);

      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    }
  });
})();
