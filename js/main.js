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
var similarAdvertisements = [];

// Функция для создания массива объектов - похожих объявлений неподалеку из 8 сгенерированных JS объектов.
var generatesimilarAdvertisements = function (count) {
  for (var i = 0; i < count; i++) {
    similarAdvertisements.push({
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
generatesimilarAdvertisements(ADVERTISEMENT_COUNT);

console.log(similarAdvertisements);

// Выбираем карту объявлений и пеерключаем ее в активное состояние
var accomodationMap = document.querySelector('.map').classList.remove('map--faded');

// содержимое шаблона для добавления объявления
var newAdvertisement = document.querySelector('#card').content.querySelector('.map__card popup');

// функция создания DOM-элемента на основе объекта c объявлением
var rendersimilarAdvertisement = function (advertisement) {

  var advertisementItem = newAdvertisement.cloneNode(true);
  advertisementItem.querySelector('.popup__avatar').src = advertisement.autor.avatar;
  advertisementItem.querySelector('.popup__title').textContent = advertisement.offer.title;
  advertisementItem.querySelector('.popup__text--address').textContent = advertisement.offer.address;
  advertisementItem.querySelector('.popup__text--price').textContent = advertisement.offer.price;
  advertisementItem.querySelector('.popup__type').textContent = advertisement.offer.type;
  advertisementItem.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + 'комнаты для ' + advertisement.offer.guests + 'гостей';
  advertisementItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
  // advertisementItem.querySelector('.popup__text--price').textContent = advertisement.offer.features;
  advertisementItem.querySelector('.popup__description').textContent = advertisement.offer.description;
  advertisementItem.querySelector('.popup__photos').img.src = advertisement.offer.photos;
  return advertisementItem;
};


// Смещение метки по X
// var pinX = 1;

// Смещение метки по Y
// var pinY = 1;

// содержимое шаблона для метки
// var newPin = document.querySelector('#pin').content.querySelector('.map__pin');

// функция создания DOM-элемента для метки
// var renderPin = function (pin) {
//   var pinItem = newPin.cloneNode(true);
//   pinItem.img.style = 'left: location.x ' + pinX + ' px; top: location.y' + pinY + ' px';
//   pinItem.img.src = similarAdvertisements.author.avatar;
//   pinItem.img.alt = 'Заголовок объявления';
// };

// Метки объявлений
var advertisementPins = document.querySelector('.map__pins');

// заполнение блока DOM-элементами на основе массива JS-объектов
var fragment = document.createDocumentFragment();

// добавление каждого персонажа в fragment
for (var j = 0; j < similarAdvertisements.length; j++) {
  fragment.appendChild(rendersimilarAdvertisement(similarAdvertisements[j]));
}

// добавление содержимого fragment в блок с персонажами
advertisementPins.appendChild(fragment);
