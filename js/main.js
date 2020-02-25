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
// var fillNewAdvertisementTextContent = function (item, selector, value) {
//   if (value !== '') {
//     item.querySelector(selector).textContent = value;
//   } else {
//     item.querySelector(selector).addClassList('hidden');
//   }
// };

// функция для добавления setAttribute в DOM-элементе
// var fillNewAdvertisementSetAttribute = function (item, selector, attribute, value) {
//   if (value !== '') {
//     item.querySelector(selector).setAttribute(attribute, value);
//   } else {
//     item.querySelector(selector).addClassList('hidden');
//   }
// };

// Выбираем карту объявлений и пеерключаем ее в активное состояние
var accommodationMap = document.querySelector('.map');

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

// Задание 4.2
var addForm = document.querySelector('.ad-form');
var fieldsetAddForm = addForm.querySelectorAll('fieldset');
var mapFilters = document.querySelector('.map__filters');
var mapFiltersSelect = mapFilters.querySelectorAll('select');
var mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');
var mainPin = accommodationMap.querySelector('.map__pin--main');
var addressAddForm = addForm.querySelector('#address');
var titleAddForm = addForm.querySelector('#title');
var priceAddForm = addForm.querySelector('#price');
var typeAddForm = addForm.querySelector('#type');
var timeinAddForm = addForm.querySelector('#timein');
var timeoutAddForm = addForm.querySelector('#timeout');
var roomNumberAddForm = addForm.querySelector('#room_number');
var capacityAddForm = addForm.querySelector('#capacity');
// научиться вычислять указатель
var mainPinX = mainPin.offsetWidth / 2;
var mainPinY = mainPin.offsetHeight;
var mainPinCenterY = mainPin.offsetHeight / 2;

// Функция для переключения страницы между активным и неактивным состояниями
var tuneDisabled = function (target, mode) {
  for (var d = 0; d < target.length; d++) {
    target[d].disabled = mode;
  }
  return target;
};

// disabled
var disabledForm = function () {
  tuneDisabled(fieldsetAddForm, true);
  tuneDisabled(mapFiltersSelect, true);
  tuneDisabled(mapFiltersFieldset, true);
  addressAddForm.setAttribute('placeholder', mainPinX + ', ' + mainPinCenterY);
};

disabledForm();

// active
var activateForm = function () {
  accommodationMap.classList.remove('map--faded');
  addForm.classList.remove('ad-form--disabled');
  tuneDisabled(fieldsetAddForm, false);
  tuneDisabled(mapFiltersSelect, false);
  tuneDisabled(mapFiltersFieldset, false);
  addressAddForm.setAttribute('placeholder', mainPinX + ', ' + mainPinY);

  advertisementPins.appendChild(fragment);
};

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.which.toString() === '1') {
    activateForm();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activateForm();
  }
});

// advertisementPins.appendChild(fragment);

/* Задание 3.2 */

// содержимое шаблона для добавления объявления

// var newAdvertisement = document.querySelector('#card').content.querySelector('.map__card.popup');

// var renderAdvertisement = function (advertisement) {
//   var advertisementItem = newAdvertisement.cloneNode(true);

//   var allFeatures = advertisementItem.querySelector('.popup__features');
//   var features = advertisementItem.querySelector('.popup__feature').cloneNode(true);
//   allFeatures.innerHTML = '';
//   var allPhotos = advertisementItem.querySelector('.popup__photos');
//   var photos = advertisementItem.querySelector('.popup__photo').cloneNode(true);
//   allPhotos.innerHTML = '';

//   fillNewAdvertisementSetAttribute(advertisementItem, '.popup__avatar', 'src', advertisement.author.avatar);
//   fillNewAdvertisementTextContent(advertisementItem, '.popup__title', advertisement.offer.title);
//   fillNewAdvertisementTextContent(advertisementItem, '.popup__text--address', advertisement.offer.address);
//   fillNewAdvertisementTextContent(advertisementItem, '.popup__text--price', advertisement.offer.price + ' ₽/ночь');
//   fillNewAdvertisementTextContent(advertisementItem, '.popup__type', advertisement.offer.type);
//   fillNewAdvertisementTextContent(advertisementItem, '.popup__text--capacity', advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей');
//   fillNewAdvertisementTextContent(advertisementItem, '.popup__text--time', 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout);

//   for (var f = 0; f < advertisement.offer.features.length; f++) {
//     var featureItem = features.cloneNode(true);
//     featureItem.classList = 'popup__feature popup__feature--' + advertisement.offer.features[f];
//     allFeatures.appendChild(featureItem);
//   }

//   fillNewAdvertisementTextContent(advertisementItem, '.popup__description', advertisement.offer.description);

//   for (var p = 0; p < advertisement.offer.photos.length; p++) {
//     var photoItem = photos.cloneNode(true);
//     photoItem.setAttribute('src', advertisement.offer.photos[p]);
//     allPhotos.appendChild(photoItem);
//   }

//   return advertisementItem;
// };

// var fragmentaccommodation = document.createDocumentFragment();

// fragmentaccommodation.appendChild(renderAdvertisement(advertisements[0]));

// accommodationMap.insertBefore(fragmentaccommodation, document.querySelector('.map__filters-container'));

// валидация

// 3.1
titleAddForm.addEventListener('invalid', function () {
  if (titleAddForm.validity.tooShort) {
    titleAddForm.setCustomValidity('Заголовок объявления должен состоять минимум из 30-ти символов');
  } else if (titleAddForm.validity.tooLong) {
    titleAddForm.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
  } else if (titleAddForm.validity.valueMissing) {
    titleAddForm.setCustomValidity('Обязательное поле');
  } else {
    titleAddForm.setCustomValidity('');
  }
});

// 3.3
typeAddForm.addEventListener('change', function () {
  if (typeAddForm.value === 'bungalo') {
    priceAddForm.setAttribute('min', '0');
    priceAddForm.setAttribute('placeholder', '0');
  } else if (typeAddForm.value === 'flat') {
    priceAddForm.setAttribute('min', '1000');
    priceAddForm.setAttribute('placeholder', '1000');
  } else if (typeAddForm.value === 'house') {
    priceAddForm.setAttribute('min', '5000');
    priceAddForm.setAttribute('placeholder', '5000');
  } else if (typeAddForm.value === 'palace') {
    priceAddForm.setAttribute('min', '10000');
    priceAddForm.setAttribute('placeholder', '10000');
  }
});

// 3.2 - 3.3
priceAddForm.addEventListener('invalid', function () {
  if (priceAddForm.validity.badInput) {
    priceAddForm.setCustomValidity('Значение должно быть числом');
  } else if (priceAddForm.validity.rangeUnderflow) {
    priceAddForm.setCustomValidity('Цена за ночь должна быть не меньше ' + priceAddForm.min);
  } else if (priceAddForm.validity.rangeOverflow) {
    priceAddForm.setCustomValidity('Цена за ночь не должна превышать 1000000');
  } else if (priceAddForm.validity.valueMissing) {
    priceAddForm.setCustomValidity('Обязательное поле');
  } else {
    priceAddForm.setCustomValidity('');
  }
});

// 3.5
timeinAddForm.addEventListener('change', function () {
  timeoutAddForm.value = timeinAddForm.value;
});
timeoutAddForm.addEventListener('change', function () {
  timeinAddForm.value = timeoutAddForm.value;
});

// 3.6
addForm.addEventListener('change', function (evt) {
  evt.preventDefault();
  if (roomNumberAddForm.value === '1' && capacityAddForm.value !== '1') {
    roomNumberAddForm.setCustomValidity('В одной комнате может проживать только 1 человек');
  } else if (roomNumberAddForm.value === '2' && capacityAddForm.value !== '1' && capacityAddForm.value !== '2') {
    roomNumberAddForm.setCustomValidity('В двух комнатах могут проживать только 1 или 2 человека');
  } else if (roomNumberAddForm.value === '1' && capacityAddForm.value === '0') {
    roomNumberAddForm.setCustomValidity('В трех комнатах могут проживать только 1, 2 или 3 человека');
  } else if (roomNumberAddForm.value === '1' && capacityAddForm.value !== '0') {
    roomNumberAddForm.setCustomValidity('100 комнат предназначены не для гостей');
  } else {
    roomNumberAddForm.setCustomValidity('');
  }
});
