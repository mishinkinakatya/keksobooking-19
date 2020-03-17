'use strict';
(function () {
  var mapCardPopup;
  var closePopup;
  var activePinItem;
  var statusModal;

  var openModal = function (modal) {
    var currentModal = window.card.renderAdvertisement(modal);
    window.card.fragmentaccommodation.appendChild(currentModal);
    window.data.map.insertBefore(window.card.fragmentaccommodation, document.querySelector('.map__filters-container'));
    mapCardPopup = window.data.map.querySelector('.map__card');
    closePopup = mapCardPopup.querySelector('.popup__close');
  };

  var popupEscPressHandler = function (evt) {
    if (evt.key === 'Escape') {
      statusModal = false;
      window.modal.close(mapCardPopup);
    }
  };

  window.modal = {
    close: function () {
      if (mapCardPopup) {
        mapCardPopup.remove();
      }
      if (activePinItem) {
        activePinItem.classList.remove('map__pin--active');
      }
      document.removeEventListener('keydown', popupEscPressHandler);
    },

    render: function (modal, item) {
      if (activePinItem) {
        activePinItem.classList.remove('map__pin--active');
      }
      if (statusModal) {
        window.modal.close();
      }
      openModal(modal);
      statusModal = true;
      item.classList.add('map__pin--active');
      activePinItem = item;
      document.addEventListener('keydown', popupEscPressHandler);
      closePopup.addEventListener('click', function () {
        statusModal = false;
        window.modal.close();
      });
    },
  };
})();
