'use strict';
// функция для отрисовки меток
// координаты меток
(function () {
  var newPin = document.querySelector('#pin').content.querySelector('.map__pin');

  var pinSize = {
    pinHeight: newPin.offsetHeight,
    pinHalfWidth: newPin.offsetWidth / 2,
  };

  window.pin = {
    // координаты метки
    pinCoords: {
      minX: pinSize.pinHalfWidth,
      maxX: window.data.mapPins.offsetWidth - pinSize.pinHalfWidth,
      minY: 130,
      maxY: 630,
    },
    // фрагмент с меткой
    fragment: document.createDocumentFragment(),
    // функция для отрисовки метки
    renderPin: function (pin) {
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
    },
  };

})();
