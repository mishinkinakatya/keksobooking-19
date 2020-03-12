'use strict';
// переключение страницы между активным и неактивным режимами
// отрисовка меток
// отображение модального окна с объявлением при нажатии на метку
(function () {
  var mapCardPopup;
  var closeButton;
  var activePinItem;
  var statusModal;

  // открытие карточки
  var openModal = function (modal) {
    var currentModal = window.card.renderAdvertisement(modal);
    window.card.fragmentaccommodation.appendChild(currentModal);
    window.data.map.insertBefore(window.card.fragmentaccommodation, document.querySelector('.map__filters-container'));
    mapCardPopup = window.data.map.querySelector('.map__card');
    closeButton = mapCardPopup.querySelector('.popup__close');
  };

  // открытие модального окна с объявлением
  window.map = {
    closeModal: function () {
      if (mapCardPopup) {
        // window.data.map.removeChild(mapCardPopup);
        mapCardPopup.remove();
      }
      if (activePinItem) {
        activePinItem.classList.remove('map__pin--active');
      }
      document.removeEventListener('keydown', popupEscPressHandler);
    },
    displayModal: function (modal, item) {
      if (activePinItem) {
        activePinItem.classList.remove('map__pin--active');
      }
      if (statusModal) {
        window.map.closeModal();
      }
      openModal(modal);
      statusModal = true;
      item.classList.add('map__pin--active');
      activePinItem = item;
      document.addEventListener('keydown', popupEscPressHandler);
      closeButton.addEventListener('click', function () {
        statusModal = false;
        window.map.closeModal();
      });
    },
  };

  // обработчик на клавишу Esc
  var popupEscPressHandler = function (evt) {
    if (evt.key === 'Escape') {
      statusModal = false;
      window.map.closeModal(mapCardPopup);
    }
  };
})();
