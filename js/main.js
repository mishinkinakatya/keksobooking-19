'use strict';

// Количество объявлений
var ADVERTISEMENT_COUNT = 8;

// координаты метки по У
var pinMinY = 130;
var pinMaxY = 630;

// Массив с вариантами типа жилья
var accomodationTypes = ['palace', 'flat', 'house', 'bungalo'];

// Массив со временем заселения
var checkinTimes = ['12:00', '13:00', '14:00'];

// Массив со временем выселения
var checkoutTimes = ['12:00', '13:00', '14:00'];

// Массив с дополнительными возможностями для жилья
var accomodationFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Массив с фотографиями жилья
var accomodationPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Функция для генерации случайных чисел
var generateRandomNumbers = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Выбираем карту объявлений и пеерключаем ее в активное состояние
var accomodationMap = document.querySelector('.map').classList.remove('map--faded');

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

// Массив с похожими объявлениями
var similarAdvertisements = [];

// Функция для создания массива объектов - похожих объявлений неподалеку из 8 сгенерированных JS объектов.
var generateAdvertisements = function (count) {
  for (var i = 0; i < count; i++) {
    similarAdvertisements.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },
      offer: {
        title: 'Заголовок предложения',
        address: '600, 350',
        price: 1000,
        type: accomodationTypes[generateRandomNumbers(0, accomodationTypes.length)],
        rooms: 2,
        guests: 4,
        checkin: checkinTimes[generateRandomNumbers(0, checkinTimes.length)],
        checkout: checkoutTimes[generateRandomNumbers(0, checkoutTimes.length)],
        features: accomodationFeatures[generateRandomNumbers(0, accomodationFeatures.length)],
        description: 'Строка с описанием жилья',
        photos: accomodationPhotos[generateRandomNumbers(0, accomodationPhotos.length)],
      },
      location: {
        x: generateRandomNumbers(pinMinX, pinMaxX),
        y: generateRandomNumbers(pinMinY, pinMaxY),
      }
    });
  }
  return similarAdvertisements;
};

// Заполняем массив похожими объявлениями
var advertisements = generateAdvertisements(ADVERTISEMENT_COUNT);

// функция создания DOM-элемента для метки
var renderPin = function (pin) {
  var pinItem = newPin.cloneNode(true);
  pinItem.setAttribute('style', 'left: ' + (pin.location.x - widthPinHalf) + 'px; top: ' + (pin.location.y - heightPin) + 'px');
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
