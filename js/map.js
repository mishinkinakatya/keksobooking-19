'use strict';
// переключение страницы между активным и неактивным режимами
// отрисовка меток
// отображение модального окна с объявлением при нажатии на метку
(function () {
  var mapCardPopup;
  var closeButton;
  var activePinItem;
  var statusModal;

  // открытие модального окна с объявлением
  window.map = {
    adForm: document.querySelector('.ad-form'),
    displayModal: function (modal, item) {
      if (activePinItem) {
        activePinItem.classList.remove('map__pin--active');
      }
      if (statusModal) {
        closeModal(mapCardPopup);
      }
      openModal(modal);
      statusModal = true;
      item.classList.add('map__pin--active');
      activePinItem = item;
      document.addEventListener('keydown', popupEscPressHandler);
      closeButton.addEventListener('click', function () {
        statusModal = false;
        closeModal(mapCardPopup);
      });
    },
  };

  var fieldsetadForm = window.map.adForm.querySelectorAll('fieldset');
  var address = window.map.adForm.querySelector('#address');
  var mapFilters = window.data.map.querySelector('.map__filters');
  var mapFiltersSelect = mapFilters.querySelectorAll('select');
  var mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');
  var mainPin = window.data.map.querySelector('.map__pin--main');
  // научиться вычислять указатель
  var mainPinCoords = {
    x: mainPin.offsetWidth / 2,
    y: mainPin.offsetHeight,
    centerY: mainPin.offsetHeight / 2,
  };

  // Функция для переключения страницы между активным и неактивным состояниями
  var tuneDisabled = function (target, mode) {
    for (var d = 0; d < target.length; d++) {
      target[d].disabled = mode;
    }
    return target;
  };

  // переключение в НЕактивный режим
  var disabledForm = function () {
    tuneDisabled(fieldsetadForm, true);
    tuneDisabled(mapFiltersSelect, true);
    tuneDisabled(mapFiltersFieldset, true);
    address.setAttribute('placeholder', mainPinCoords.x + ', ' + mainPinCoords.centerY);
  };

  disabledForm();

  // переключение в активный режим
  var activateForm = function () {
    window.data.map.classList.remove('map--faded');
    window.map.adForm.classList.remove('ad-form--disabled');
    tuneDisabled(fieldsetadForm, false);
    tuneDisabled(mapFiltersSelect, false);
    tuneDisabled(mapFiltersFieldset, false);
    address.setAttribute('placeholder', mainPinCoords.x + ', ' + mainPinCoords.y);

    window.data.mapPins.appendChild(window.pin.fragment);
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which.toString() === '1') {
      activateForm();
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activateForm();
    }
  });

  // отрисовка метки
  for (var j = 0; j < window.card.advertisements.length; j++) {
    if (window.card.advertisements[j].offer) {
      window.pin.fragment.appendChild(window.pin.renderPin(window.card.advertisements[j]));
    }
  }

  // открытие карточки
  var openModal = function (modal) {
    var currentModal = window.card.renderAdvertisement(modal);
    window.card.fragmentaccommodation.appendChild(currentModal);
    window.data.map.insertBefore(window.card.fragmentaccommodation, document.querySelector('.map__filters-container'));
    mapCardPopup = window.data.map.querySelector('.map__card');
    closeButton = mapCardPopup.querySelector('.popup__close');
  };

  // закытие карточки
  var closeModal = function (modal) {
    window.data.map.removeChild(modal);
    activePinItem.classList.remove('map__pin--active');
    document.removeEventListener('keydown', popupEscPressHandler);
  };

  // обработчик на клавишу Esc
  var popupEscPressHandler = function (evt) {
    if (evt.key === 'Escape') {
      statusModal = false;
      closeModal(mapCardPopup);
    }
  };
})();
