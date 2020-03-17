'use strict';
(function () {
  var URL_FORM = 'https://js.dump.academy/keksobooking';
  var URL_DATA = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200,
  };

  var makeRequest = function (onLoad, onError, xhr) {
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      makeRequest(onLoad, onError, xhr);
      xhr.open('GET', URL_DATA);
      xhr.send();

    },

    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      makeRequest(onLoad, onError, xhr);
      xhr.open('POST', URL_FORM);
      xhr.send(data);
    },
  };
})();
