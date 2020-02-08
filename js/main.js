'use strict';

// Количество объявлений
var ADVERTISEMENT_COUNT = 8;

/* массивы с данными для объявлений */
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

/* */

/* общие функции*/

// Функция для генерации случайных чисел в зависимости от длины массива
var generateRandomNumbersForArray = function (arrayLength) {
  return Math.floor(Math.random() * Math.floor(arrayLength - 1));
};

/* */

// Выбираем карту объявлений и пеерключаем ее в активное состояние
var accomodationMap = document.querySelector('.map').classList.remove('map--faded');

// содержимое шаблона для метки
var newPin = document.querySelector('#pin').content.querySelector('.map__pin');

// Метки объявлений в разметке
var advertisementPins = document.querySelector('.map__pins');

// Массив с похожими объявлениями
var similarAdvertisements = [];

// Функция для создания массива объектов - похожих объявлений неподалеку из 8 сгенерированных JS объектов.
var generateDataForAdvertisements = function (count) {
  for (var i = 0; i < count; i++) {
    similarAdvertisements.push({
      author: {
        avatar: 'img/avatars/user0' + Math.floor(Math.random() * (8 - 1) + 1) + '.png',
      },
      offer: {
        title: 'Заголовок предложения',
        address: '600, 350',
        price: 1000,
        type: accomodationTypes[generateRandomNumbersForArray(accomodationTypes)],
        rooms: 2,
        guests: 4,
        checkin: checkinTimes[generateRandomNumbersForArray(checkinTimes)],
        checkout: checkoutTimes[generateRandomNumbersForArray(checkoutTimes)],
        features: accomodationFeatures[generateRandomNumbersForArray(accomodationFeatures)],
        description: 'Строка с описанием жилья',
        photos: accomodationPhotos[generateRandomNumbersForArray(accomodationPhotos)],
      },
      location: {
        x: Math.floor(Math.random() * (630 - 130) + 130),
        y: Math.floor(Math.random() * (630 - 130) + 130),
      }
    });
  }
  return similarAdvertisements;
};

// Создаем массив с похожими объявлениями
var advertisements = generateDataForAdvertisements(ADVERTISEMENT_COUNT);

// функция создания DOM-элемента для метки
var renderPin = function (pin) {
  var pinItem = newPin.cloneNode(true);
  pinItem.setAttribute('style', 'left: ' + 150 + ' px; top: ' + 150 + ' px');
  pinItem.querySelector('img').setAttribute('src', pin.author.avatar);
  pinItem.querySelector('img').setAttribute('alt', 'Заголовок объявления');
  return pinItem;
};

// заполнение блока DOM-элементами на основе массива JS-объектов
var fragment = document.createDocumentFragment();

for (var j = 0; j < advertisements.length; j++) {
  fragment.appendChild(renderPin(advertisements[j]));
}
// добавление содержимого fragment в блок с метками
advertisementPins.appendChild(fragment);
