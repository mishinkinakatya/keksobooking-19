'use strict';

(function () {
  // содержимое шаблона для метки
  var newPin = document.querySelector('#pin').content.querySelector('.map__pin');

  // центр метки по вертикали
  var pinHeight = newPin.offsetHeight;
  // центр метки по горизонтали
  var pinHalfWidth = newPin.offsetWidth / 2;

  window.pin = {
    pinCoords: {
      minX: pinHalfWidth,
      maxX: window.data.mapPins.offsetWidth - pinHalfWidth,
      minY: 130,
      maxY: 630,
    },
    // заполнение блока DOM-элементами на основе массива JS-объектов
    fragment: document.createDocumentFragment(),

    renderPin: function (pin) {
      var pinItem = newPin.cloneNode(true);
      pinItem.style.left = (pin.location.x - pinHalfWidth) + 'px';
      pinItem.style.top = (pin.location.y - pinHeight) + 'px';
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
