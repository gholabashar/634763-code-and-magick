'use strict';

(function () {

  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };

  var Status = {
    SUCCESS: 200,
    ERROR_REQUEST: 400,
    ERROR_NOT_FOUND: 404,
    ERROR_SERVER: 500
  };

  var getRandomItemFromArray = function (arr) {
    return arr[Math.round(Math.random() * (arr.length - 1))];
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === KeyCode.ESC) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === KeyCode.ENTER) {
      action();
    }
  };

  var showError = function (text) {
    var popup = document.createElement('div');

    popup.classList.add('error');
    popup.textContent = text;

    document.body.appendChild(popup);
  };

  var hideError = function () {
    var error = document.querySelector('.error');

    if (error) {
      error.remove();
    }
  };

  var statusCodeCB = function (xhr, successCallback, errorCallback) {

    switch (xhr.status) {
      case Status.SUCCESS:
        successCallback(xhr.response);
        break;
      case Status.ERROR_REQUEST:
        errorCallback('Ошибка запроса');
        break;
      case Status.ERROR_NOT_FOUND:
        errorCallback('Не найдено');
        break;
      case Status.ERROR_SERVER:
        errorCallback('Внутренняя ошибка сервера');
        break;
      default:
        errorCallback('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomItemFromArray: getRandomItemFromArray,
    KeyCode: KeyCode,
    showError: showError,
    hideError: hideError,
    statusCodeCB: statusCodeCB
  };

})();
