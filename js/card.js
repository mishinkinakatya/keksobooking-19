'use strict';
(function () {
  var newAdvertisement = document.querySelector('#card').content.querySelector('.map__card.popup');

  var fillNewAdvertisementTextContent = function (item, selector, value) {
    if (value !== '') {
      item.querySelector(selector).textContent = value;
    } else {
      item.querySelector(selector).classList.add('hidden');
    }
  };

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
    fragmentaccommodation: document.createDocumentFragment(),
    renderAdvertisement: function (advertisement) {
      var advertisementItem = newAdvertisement.cloneNode(true);
      var allFeatures = advertisementItem.querySelector('.popup__features');
      var feature = advertisementItem.querySelector('.popup__feature').cloneNode(true);
      var allPhotos = advertisementItem.querySelector('.popup__photos');
      var photo = advertisementItem.querySelector('.popup__photo').cloneNode(true);

      allFeatures.innerHTML = '';
      allPhotos.innerHTML = '';

      fillNewAdvertisementSetAttribute(advertisementItem, '.popup__avatar', 'src', advertisement.author.avatar);
      fillNewAdvertisementTextContent(advertisementItem, '.popup__title', advertisement.offer.title);
      fillNewAdvertisementTextContent(advertisementItem, '.popup__text--address', advertisement.offer.address);
      fillNewAdvertisementTextContent(advertisementItem, '.popup__text--price', advertisement.offer.price + ' ₽/ночь');
      fillNewAdvertisementTextContent(advertisementItem, '.popup__type', englishToRussia[advertisement.offer.type]);
      fillNewAdvertisementTextContent(advertisementItem, '.popup__text--capacity', advertisement.offer.rooms + ' комната для ' + advertisement.offer.guests + ' гостей');
      fillNewAdvertisementTextContent(advertisementItem, '.popup__text--time', 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout);

      advertisement.offer.features.forEach(function (newFeature) {
        var featureItem = feature.cloneNode(true);
        featureItem.classList = 'popup__feature popup__feature--' + newFeature;
        allFeatures.appendChild(featureItem);
      });

      fillNewAdvertisementTextContent(advertisementItem, '.popup__description', advertisement.offer.description);

      advertisement.offer.photos.forEach(function (newPhoto) {
        var photoItem = photo.cloneNode(true);
        photoItem.setAttribute('src', newPhoto);
        allPhotos.appendChild(photoItem);
      });

      return advertisementItem;
    },
  };
})();
