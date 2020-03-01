'use strict';

(function () {

  // отрисовка метки и карточки
  for (var j = 0; j < window.card.advertisements.length; j++) {
    if (window.card.advertisements[j].offer) {
      window.pin.fragment.appendChild(window.pin.renderPin(window.card.advertisements[j]));
    }
  }

  var mapCardPopup;
  var closeButton;
  var activePinItem;

  var openModal = function (modal) {
    var currentModal = window.card.renderAdvertisement(modal);
    window.card.fragmentaccommodation.appendChild(currentModal);
    window.data.map.insertBefore(window.card.fragmentaccommodation, document.querySelector('.map__filters-container'));
    mapCardPopup = window.data.map.querySelector('.map__card');
    closeButton = mapCardPopup.querySelector('.popup__close');
  };

  var statusModal;
  // функция закрытия карточки
  var closeModal = function (modal) {
    window.data.map.removeChild(modal);
    document.removeEventListener('keydown', popupEscPressHandler);
  };

  var popupEscPressHandler = function (evt) {
    if (evt.key === 'Escape') {
      statusModal = false;
      closeModal(mapCardPopup);
    }
  };

  window.map = {

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
    adForm: document.querySelector('.ad-form'),
  };

  var mapFilters = window.data.map.querySelector('.map__filters');
  var mapFiltersSelect = mapFilters.querySelectorAll('select');
  var mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');
  var fieldsetadForm = window.map.adForm.querySelectorAll('fieldset');
  var address = window.map.adForm.querySelector('#address');
  // Задание 4.2
  // научиться вычислять указатель
  var mainPin = window.data.map.querySelector('.map__pin--main');
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

  // disabled
  var disabledForm = function () {
    tuneDisabled(fieldsetadForm, true);
    tuneDisabled(mapFiltersSelect, true);
    tuneDisabled(mapFiltersFieldset, true);
    address.setAttribute('placeholder', mainPinCoords.x + ', ' + mainPinCoords.centerY);
  };

  disabledForm();

  // active
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
})();
