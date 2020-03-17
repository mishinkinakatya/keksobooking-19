'use strict';
// настройка полей в форме для создания объявления
(function () {
  var form = {
    address: window.data.adForm.querySelector('#address'),
    price: window.data.adForm.querySelector('#price'),
    type: window.data.adForm.querySelector('#type'),
    timein: window.data.adForm.querySelector('#timein'),
    timeout: window.data.adForm.querySelector('#timeout'),
    roomNumber: window.data.adForm.querySelector('#room_number'),
    capacity: window.data.adForm.querySelector('#capacity'),
  };

  var roomToPrice = {
    'palace': '10000',
    'flat': '1000',
    'house': '5000',
    'bungalo': '0',
  };

  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 65,
    POINTER_HEIGHT: 22,
  };

  // настройка зависимости между типом жилья и его минимальной ценой
  var setMinPrice = function () {
    form.price.setAttribute('min', roomToPrice[form.type.value]);
    form.price.setAttribute('placeholder', roomToPrice[form.type.value]);

    return form.price;
  };

  form.type.addEventListener('change', function () {
    setMinPrice();
  });
  form.price.addEventListener('change', function () {
    setMinPrice();
  });

  // настройка зависимости между временем заселения и временем выселения
  form.timein.addEventListener('change', function () {
    form.timeout.value = form.timein.value;
  });
  form.timeout.addEventListener('change', function () {
    form.timein.value = form.timeout.value;
  });

  // настройка зависимости между количеством комнат и количеством гостей
  window.data.adForm.addEventListener('change', function (evt) {
    evt.preventDefault();
    if (form.roomNumber.value === '1' && form.capacity.value !== '1') {
      form.roomNumber.setCustomValidity('В одной комнате может проживать только 1 человек');
    } else if (form.roomNumber.value === '2' && form.capacity.value !== '1' && form.capacity.value !== '2') {
      form.roomNumber.setCustomValidity('В двух комнатах могут проживать только 1 или 2 человека');
    } else if (form.roomNumber.value === '3' && form.capacity.value === '0') {
      form.roomNumber.setCustomValidity('В трех комнатах могут проживать только 1, 2 или 3 человека');
    } else if (form.roomNumber.value === '100' && form.capacity.value !== '0') {
      form.roomNumber.setCustomValidity('100 комнат предназначены не для гостей');
    } else {
      form.roomNumber.setCustomValidity('');
    }
  });

  window.showAddress = function () {
    var pinCoordsX = Math.floor(window.data.mainPin.offsetLeft + MainPinSize.WIDTH / 2);
    var pinCoordsY;
    if (window.data.activeModeMap) {
      pinCoordsY = Math.floor(window.data.mainPin.offsetTop + MainPinSize.HEIGHT + MainPinSize.POINTER_HEIGHT);
    } else {
      pinCoordsY = Math.floor(window.data.mainPin.offsetTop + MainPinSize.HEIGHT);
    }
    form.address.value = pinCoordsX + ', ' + pinCoordsY;
  };
  window.showAddress();

})();
