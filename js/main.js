'use strict';

// Количество объявлений
var ADVERTISEMENT_COUNT = 8;

// координаты метки по У
var pinMinY = 130;
var pinMaxY = 630;

// Массив с вариантами типа жилья
var accommodationTypes = ['palace', 'flat', 'house', 'bungalo'];

// Массив со временем заселения
var checkinTimes = ['12:00', '13:00', '14:00'];

// Массив со временем выселения
var checkoutTimes = ['12:00', '13:00', '14:00'];

// Массив с дополнительными возможностями для жилья
var accommodationFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Массив с фотографиями жилья
var accommodationPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Функция для генерации случайных чисел
var generateRandomNumbers = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

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

// Выбираем карту объявлений и пеерключаем ее в активное состояние
var accommodationMap = document.querySelector('.map');
accommodationMap.classList.remove('map--faded');

// содержимое шаблона для метки
var newPin = document.querySelector('#pin').content.querySelector('.map__pin');

// Метки объявлений в разметке
var advertisementPins = document.querySelector('.map__pins');

// центр метки по горизонтали
var widthPinHalf = newPin.offsetWidth / 2;

// центр метки по вертикали
var heightPin = newPin.offsetHeight;

// координаты метки по Х
var pinMinX = widthPinHalf;
var pinMaxX = advertisementPins.offsetWidth - widthPinHalf;

var displayAccommodationType = function () {
  var type = accommodationTypes[generateRandomNumbers(0, accommodationTypes.length)];
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
      checkin: checkinTimes[generateRandomNumbers(0, checkinTimes.length)],
      checkout: checkoutTimes[generateRandomNumbers(0, checkoutTimes.length)],
      features: accommodationFeatures,
      description: 'Строка с описанием жилья',
      photos: accommodationPhotos,
    },
    location: {
      x: generateRandomNumbers(pinMinX, pinMaxX),
      y: generateRandomNumbers(pinMinY, pinMaxY),
    }
  };
};

// Функция для создания массива объектов - похожих объявлений неподалеку из 8 сгенерированных JS объектов.
var generateAdvertisements = function (count) {
  var similarAdvertisements = [];
  for (var i = 0; i < count; i++) {
    similarAdvertisements.push(createAdvertisement(i));
  }
  return similarAdvertisements;
};

// Заполняем массив похожими объявлениями
var advertisements = generateAdvertisements(ADVERTISEMENT_COUNT);

// функция создания DOM-элемента для метки
var renderPin = function (pin) {
  var pinItem = newPin.cloneNode(true);
  pinItem.style.left = (pin.location.x - widthPinHalf) + 'px';
  pinItem.style.top = (pin.location.y - heightPin) + 'px';
  pinItem.querySelector('img').setAttribute('src', pin.author.avatar);
  pinItem.querySelector('img').setAttribute('alt', 'Заголовок объявления');
  return pinItem;
};

// заполнение блока DOM-элементами на основе массива JS-объектов
var fragment = document.createDocumentFragment();

for (var j = 0; j < advertisements.length; j++) {
  fragment.appendChild(renderPin(advertisements[j]));
}

advertisementPins.appendChild(fragment);

/*Задание 3.2 */

// содержимое шаблона для добавления объявления

var newAdvertisement = document.querySelector('#card').content.querySelector('.map__card.popup');

var renderAdvertisement = function (advertisement) {
  var advertisementItem = newAdvertisement.cloneNode(true);
  fillNewAdvertisementSetAttribute(advertisementItem, '.popup__avatar', 'src', advertisement.author.avatar);
  fillNewAdvertisementTextContent(advertisementItem, '.popup__title', advertisement.offer.title);
  fillNewAdvertisementTextContent(advertisementItem, '.popup__text--address', advertisement.offer.address);
  fillNewAdvertisementTextContent(advertisementItem, '.popup__text--price', advertisement.offer.price + ' ₽/ночь');
  fillNewAdvertisementTextContent(advertisementItem, '.popup__type', advertisement.offer.type);
  fillNewAdvertisementTextContent(advertisementItem, '.popup__text--capacity', advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей');
  fillNewAdvertisementTextContent(advertisementItem, '.popup__text--time', 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout);

  var allFeatures = advertisementItem.querySelector('.popup__features');
  var features = advertisementItem.querySelector('.popup__feature');

  var addFeatures = function (feature) {
    var featureItem = features.cloneNode(true);
    featureItem.classList.add('hidden');
    if (featureItem.classList === ('.popup__feature--' + feature)) {
      featureItem.classList.remove('hidden');
    }
    return featureItem;
  };

  var fragmentFeature = document.createDocumentFragment();

  for (var f = 0; f < accommodationFeatures.length; f++) {
    fragmentFeature.appendChild(addFeatures(advertisements[0].offer.features[f]))
  }

  allFeatures.appendChild(fragmentFeature);

  fillNewAdvertisementTextContent(advertisementItem, '.popup__description', advertisement.offer.description);

  var allPhotos = advertisementItem.querySelector('.popup__photos');
  var photos = advertisementItem.querySelector('.popup__photo');

  var addPhotos = function (photo) {
    var photoItem = photos.cloneNode(true);
    photoItem.setAttribute('src', photo);
    return photoItem;
  };

  var fragmentPhoto = document.createDocumentFragment();

  for (var p = 0; p < accommodationPhotos.length; p++) {
    fragmentPhoto.appendChild(addPhotos(advertisements[0].offer.photos[p]));
  }

  allPhotos.appendChild(fragmentPhoto);

  return advertisementItem;
};

var fragmentaccommodation = document.createDocumentFragment();

fragmentaccommodation.appendChild(renderAdvertisement(advertisements[0]));

accommodationMap.insertBefore(fragmentaccommodation, document.querySelector('.map__filters-container'));
