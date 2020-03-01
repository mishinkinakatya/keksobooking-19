'use strict';
// получаем массив с объявлениями
// функция для отрисовки модального окна
(function () {
  var ADVERTISEMENT_COUNT = 8;
  var newAdvertisement = document.querySelector('#card').content.querySelector('.map__card.popup');

  // функция для добавления textContent в DOM-элементе
  var fillNewAdvertisementTextContent = function (item, selector, value) {
    if (value !== '') {
      item.querySelector(selector).textContent = value;
    } else {
      item.querySelector(selector).addClassList('hidden');
    }
  };

  // функция для добавления setAttribute в DOM-элементе
  var fillNewAdvertisementSetAttribute = function (item, selector, attribute, value) {
    if (value !== '') {
      item.querySelector(selector).setAttribute(attribute, value);
    } else {
      item.querySelector(selector).addClassList('hidden');
    }
  };

  var displayAccommodationType = function () {
    var type = window.data.accommodationParameters.types[window.data.generateRandomNumbers(0, window.data.accommodationParameters.types.length)];
    switch (type) {
      case 'palace':
        return 'Дворец';
      case 'flat':
        return 'Квартира';
      case 'house':
        return 'Дом';
      case 'bungalo':
        return 'Бунгало';
      default:
        return type;
    }
  };

  // функция для создания одной карточки
  var createAdvertisement = function (i) {
    return {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },
      offer: {
        title: 'Заголовок предложения',
        address: '600, 350',
        price: 1000,
        type: displayAccommodationType(),
        rooms: 2,
        guests: 4,
        checkin: window.data.accommodationParameters.checkinTimes[window.data.generateRandomNumbers(0, window.data.accommodationParameters.checkinTimes.length)],
        checkout: window.data.accommodationParameters.checkoutTimes[window.data.generateRandomNumbers(0, window.data.accommodationParameters.checkoutTimes.length)],
        features: window.data.accommodationParameters.features,
        description: 'Строка с описанием жилья',
        photos: window.data.accommodationParameters.photos,
      },
      location: {
        x: window.data.generateRandomNumbers(window.pin.pinCoords.minX, window.pin.pinCoords.maxX),
        y: window.data.generateRandomNumbers(window.pin.pinCoords.minY, window.pin.pinCoords.maxY),
      }
    };
  };

  // Функция для создания массива объектов - объявлений.
  var generateAdvertisements = function (count) {
    var similarAdvertisements = [];
    for (var i = 0; i < count; i++) {
      similarAdvertisements.push(createAdvertisement(i));
    }
    return similarAdvertisements;
  };

  window.card = {
    // массив с получившимися объявлениями
    advertisements: generateAdvertisements(ADVERTISEMENT_COUNT),
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
      fillNewAdvertisementTextContent(advertisementItem, '.popup__type', advertisement.offer.type);
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
