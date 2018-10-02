'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setup = document.querySelector('.setup');
  var setupCoat = setup.querySelector('.wizard-coat');
  var setupEyes = setup.querySelector('.wizard-eyes');
  var setupFireball = setup.querySelector('.setup-fireball-wrap');
  var setupForm = setup.querySelector('.setup-wizard-form');
  var setupCoatInput = setupForm.querySelector('[name=coat-color]');
  var setupEyesInput = setupForm.querySelector('[name=eyes-color]');
  var setupFireballlInput = setupForm.querySelector('[name=fireball-color]');

  setupCoat.addEventListener('click', function () {
    setupCoatInput.value = window.util.getRandomItemFromArray(COAT_COLORS);
    setupCoat.style.fill = setupCoatInput.value;
  });

  setupEyes.addEventListener('click', function () {
    setupEyesInput.value = window.util.getRandomItemFromArray(EYES_COLORS);
    setupEyes.style.fill = setupEyesInput.value;
  });

  setupFireball.addEventListener('click', function () {
    setupFireballlInput.value = window.util.getRandomItemFromArray(FIREBALL_COLORS);
    setupFireball.style.background = setupFireballlInput.value;
  });

})();
