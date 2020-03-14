'use strict';
// получаем массив с объявлениями
// функция для отрисовки модального окна
(function () {
  var newAdvertisement = document.querySelector('#card').content.querySelector('.map__card.popup');

  // функция для добавления textContent в DOM-элементе
  var fillNewAdvertisementTextContent = function (item, selector, value) {
    if (value !== '') {
      item.querySelector(selector).textContent = value;
    } else {
      item.querySelector(selector).classList.add('hidden');
    }
  };

  // функция для добавления setAttribute в DOM-элементе
  var fillNewAdvertisementSetAttribute = function (item, selector, attribute, value) {
    if (value !== '') {
      item.querySelector(selector).setAttribute(attribute, value);
    } else {
      item.querySelector(selector).classList.add('hidden');
    }
  };

  var englishToRussia = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
  };

  window.card = {
    // фрагмент с карточкой объявления
    fragmentaccommodation: document.createDocumentFragment(),
    // функция для отрисовки карточки (модального окна)
    renderAdvertisement: function (advertisement) {
      var advertisementItem = newAdvertisement.cloneNode(true);
      var allFeatures = advertisementItem.querySelector('.popup__features');
      var features = advertisementItem.querySelector('.popup__feature').cloneNode(true);
      allFeatures.innerHTML = '';
      var allPhotos = advertisementItem.querySelector('.popup__photos');
      var photos = advertisementItem.querySelector('.popup__photo').cloneNode(true);
      allPhotos.innerHTML = '';

      fillNewAdvertisementSetAttribute(advertisementItem, '.popup__avatar', 'src', advertisement.author.avatar);
      fillNewAdvertisementTextContent(advertisementItem, '.popup__title', advertisement.offer.title);
      fillNewAdvertisementTextContent(advertisementItem, '.popup__text--address', advertisement.offer.address);
      fillNewAdvertisementTextContent(advertisementItem, '.popup__text--price', advertisement.offer.price + ' ₽/ночь');
      fillNewAdvertisementTextContent(advertisementItem, '.popup__type', englishToRussia[advertisement.offer.type]);
      fillNewAdvertisementTextContent(advertisementItem, '.popup__text--capacity', advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей');
      fillNewAdvertisementTextContent(advertisementItem, '.popup__text--time', 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout);

      for (var f = 0; f < advertisement.offer.features.length; f++) {
        var featureItem = features.cloneNode(true);
        featureItem.classList = 'popup__feature popup__feature--' + advertisement.offer.features[f];
        allFeatures.appendChild(featureItem);
      }

      fillNewAdvertisementTextContent(advertisementItem, '.popup__description', advertisement.offer.description);

      for (var p = 0; p < advertisement.offer.photos.length; p++) {
        var photoItem = photos.cloneNode(true);
        photoItem.setAttribute('src', advertisement.offer.photos[p]);
        allPhotos.appendChild(photoItem);
      }
      return advertisementItem;
    },
  };
})();
