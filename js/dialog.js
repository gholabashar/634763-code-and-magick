'use strict';

(function () {

  var setupDialog = document.querySelector('.setup');
  var setupDialogMove = setupDialog.querySelector('.upload');

  var onMouseDown = function (evt) {
    evt.preventDefault();

    var startPoints = {
      x: evt.clientX,
      y: evt.clientY
    };

    var isMoved = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      isMoved = true;

      var currentPoints = {
        x: startPoints.x - moveEvt.clientX,
        y: startPoints.y - moveEvt.clientY
      };

      startPoints = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentY = setupDialog.offsetTop - currentPoints.y;
      var currentX = setupDialog.offsetLeft - currentPoints.x;
      var stopRightX = document.body.offsetWidth - setupDialog.offsetWidth
        / 2;
      var stopLeftX = setupDialog.offsetWidth / 2;
      var stopBottomY = document.body.offsetHeight - setupDialog.offsetHeight
        / 3;

      if (currentY > 0 && currentY < stopBottomY) {
        setupDialog.style.top = currentY + 'px';
      }

      if (currentX < stopRightX && currentX > stopLeftX) {
        setupDialog.style.left = currentX + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      var clickPreventHandler = function (clickEvt) {
        clickEvt.preventDefault();
        setupDialogMove.removeEventListener('click', clickPreventHandler);
      };

      if (isMoved) {
        setupDialogMove.addEventListener('click', clickPreventHandler);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  setupDialogMove.addEventListener('mousedown', onMouseDown);

})();
