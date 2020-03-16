'use strict';
(function () {
  var MapSize = {
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
    }
    return x;
  };

  var calculatePinCoords = function (xCoord, yCoord) {
    var mainPinCoords = {
      x: limitMove(xCoord, MapSize.MIN_X, MapSize.MAX_X),
      y: limitMove(yCoord, MapSize.MIN_Y, MapSize.MAX_Y),
    };

    window.data.mainPin.style.left = mainPinCoords.x + 'px';
    window.data.mainPin.style.top = mainPinCoords.y + 'px';
    window.showAddress();
  };

  window.data.mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.mode.activateForm();
    }
  });

  var xCoord;
  var yCoord;
  window.data.mainPin.addEventListener('mousedown', function (evt) {
    if (!window.data.activeModeMap && evt.which.toString() === '1') {
      window.mode.activateForm();

      xCoord = parseInt(window.data.mainPin.style.left, 10);
      yCoord = parseInt(window.data.mainPin.style.top, 10);

    } else {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY,
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
        xCoord = xCoord - shift.x;
        yCoord = yCoord - shift.y;
        calculatePinCoords(xCoord, yCoord);
      };

      var mouseUpHandler = function () {
        calculatePinCoords(xCoord, yCoord);
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);

      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);

    }
  });
})();
