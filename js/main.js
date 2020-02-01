'use strict';

// Количество объявлений
var ADVERTISEMENT_COUNT = 8;

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

// Функция для генерации случайных чисел в зависимости от длины массива
var generateRandomNumbersForArray = function (arrayLength) {
  return Math.floor(Math.random() * Math.floor(arrayLength - 1));
};

// Массив с похожими объявлениями
var similarAdvertisement = [];

// Функция для создания массива объектов - похожих объявлений неподалеку из 8 сгенерированных JS объектов.
var generateSimilarAdvertisement = function (count) {
  for (var i = 0; i < count; i++) {
    similarAdvertisement.push({
      author: {
        avatar: 'img/avatars/user0' + Math.floor(Math.random() * (8 - 1) + 1) + '.png',
      },
      offer: {
        title: 'Заголовок предложения',
        address: 'location.x' + ', ' + 'location.y',
        price: 1000,
        type: accomodationTypes[generateRandomNumbersForArray(accomodationTypes)],
        rooms: 2,
        guests: 4,
        checkin: checkinTimes[generateRandomNumbersForArray(checkinTimes)],
        checkout: checkoutTimes[generateRandomNumbersForArray(checkoutTimes)],
        features: accomodationFeatures[generateRandomNumbersForArray(accomodationFeatures)],
        description: 'Строка с описанием жилья',
        photos: accomodationPhotos,
      },
      location: {
        x: Math.floor(Math.random() * (630 - 130) + 130),
        y: Math.floor(Math.random() * (630 - 130) + 130),
      }
    });
  }
};

// Создаем массив с похожими объявлениями
generateSimilarAdvertisement(ADVERTISEMENT_COUNT);

console.log(similarAdvertisement);
