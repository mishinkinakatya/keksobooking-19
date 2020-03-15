'use strict';
// функция для отрисовки меток
// координаты меток
(function () {
  var ADVERTISEMENT_COUNT = 5;

  var newPin = document.querySelector('#pin').content.querySelector('.map__pin');

  var pinSize = {
    pinHeight: newPin.offsetHeight,
    pinHalfWidth: newPin.offsetWidth / 2,
  };

  // функция для отрисовки метки
  var renderPin = function (pin) {
    var pinItem = newPin.cloneNode(true);
    pinItem.style.left = (pin.location.x - pinSize.pinHalfWidth) + 'px';
    pinItem.style.top = (pin.location.y - pinSize.pinHeight) + 'px';
    pinItem.querySelector('img').setAttribute('src', pin.author.avatar);
    pinItem.querySelector('img').setAttribute('alt', 'Заголовок объявления');

    pinItem.addEventListener('click', function () {
      window.map.displayModal(pin, pinItem);
    });

    pinItem.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        window.map.displayModal(pin, pinItem);
      }
    });

    return pinItem;
  };

  window.pin = {
    deletePins: function () {
      var newPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < newPins.length; i++) {
        window.data.mapPins.removeChild(newPins[i]);
      }
    },
    renderPins: function (advertisements) {
      var takeNumber = advertisements.length > ADVERTISEMENT_COUNT ? ADVERTISEMENT_COUNT : advertisements.length;
      window.pin.deletePins();
      for (var j = 0; j < takeNumber; j++) {
        if (advertisements[j].offer) {
          window.data.mapPins.appendChild(renderPin((advertisements[j])));
        }
      }
    },
  };

})();
