'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SAVE = 'https://js.dump.academy/kekstagram';
  var StatusCode = {
    OK: 200
  };

  //
  var request = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

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

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);
    xhr.send(data);
  };

  //
  var load = function (onLoad, onError) {
    request('GET', URL_LOAD, onLoad, onError);
  };

  //
  var save = function (data, onLoad, onError) {
    request('POST', URL_SAVE, onLoad, onError, data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
