'use strict';
// настройка полей в форме для создания объявления
(function () {

  var form = {
    price: window.map.adForm.querySelector('#price'),
    type: window.map.adForm.querySelector('#type'),
    timein: window.map.adForm.querySelector('#timein'),
    timeout: window.map.adForm.querySelector('#timeout'),
    roomNumber: window.map.adForm.querySelector('#room_number'),
    capacity: window.map.adForm.querySelector('#capacity'),
  };

  // настройка зависимости между типом жилья и его минимальной ценой
  var setMinPrice = function () {
    switch (form.type.value) {
      case 'bungalo':
        form.price.setAttribute('min', '0');
        form.price.setAttribute('placeholder', '0');
        break;
      case 'flat':
        form.price.setAttribute('min', '1000');
        form.price.setAttribute('placeholder', '1000');
        break;
      case 'house':
        form.price.setAttribute('min', '5000');
        form.price.setAttribute('placeholder', '5000');
        break;
      case 'palace':
        form.price.setAttribute('min', '10000');
        form.price.setAttribute('placeholder', '10000');
        break;
    }
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
  window.map.adForm.addEventListener('change', function (evt) {
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
})();
