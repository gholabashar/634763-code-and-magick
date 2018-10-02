'use strict';

(function () {
  var TIMEOUT = 10000;

  var Url = {
    GET: 'https://js.dump.academy/code-and-magick/data',
    POST: 'https://js.dump.academy/code-and-magick'
  };

  var process = function (xhr, loadCallback, errorCallback) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      window.util.statusCodeCB(xhr, loadCallback, errorCallback);
    });

    xhr.addEventListener('error', function () {
      errorCallback('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorCallback('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  var load = function (loadCallback, errorCallback) {
    var xhr = new XMLHttpRequest();

    process(xhr, loadCallback, errorCallback);

    xhr.open('GET', Url.GET);
    xhr.send();
  };

  var save = function (data, saveCallback, errorCallback) {
    var xhr = new XMLHttpRequest();

    process(xhr, saveCallback, errorCallback);

    xhr.open('POST', Url.POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
