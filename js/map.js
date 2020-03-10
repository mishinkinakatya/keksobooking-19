'use strict';
// переключение страницы между активным и неактивным режимами
// отрисовка меток
// отображение модального окна с объявлением при нажатии на метку
(function () {
  var mapCardPopup;
  var closeButton;
  var activePinItem;
  var statusModal;

  // функция, которая срабатывает при загрузке данных с сервера
  var loadHandler = function (advertisements) {

    for (var j = 0; j < advertisements.length; j++) {
      if (advertisements[j].offer) {
        window.pin.fragment.appendChild(window.pin.renderPin((advertisements[j])));
      }
    }
  };

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
    errorHandler: function (message) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';
      node.textContent = message;
      document.body.insertAdjacentElement('afterbegin', node);
    },
  };

  window.backend.load(loadHandler, window.map.errorHandler);
})();
