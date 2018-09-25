'use strict';

var WIZARD_NAMES = ['Иван ', 'Хуан Себастьян ', 'Мария ', 'Кристоф ', 'Виктор ', 'Юлия ', 'Люпита ', 'Вашингтон '];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var wizardsAmount = 4;
var wizards = [];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = userDialog.querySelector('.setup-similar-list');

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupSubmit = setup.querySelector('.setup-submit');
var wizardForm = setup.querySelector('.setup-wizard-form');
var setupWizard = setup.querySelector('.setup-wizard');
var setupCoat = setup.querySelector('.wizard-coat');
var setupEyes = setup.querySelector('.wizard-eyes');
var setupFireball = setup.querySelector('.setup-fireball-wrap');
var setupPlayerElements = document.querySelector('.setup-player').getElementsByTagName('input');
var setupUserName = setup.querySelector('.setup-user-name');
setup.classList.add('hidden');

var getRandomItemFromArray = function (arr) {
  return arr[Math.round(Math.random() * (arr.length - 1))];
};

for (var i = 1; i <= wizardsAmount; i++) {
  wizards.push({
    name: getRandomItemFromArray(WIZARD_NAMES) + getRandomItemFromArray(WIZARD_SURNAMES),
    coatColor: getRandomItemFromArray(COAT_COLORS),
    eyesColor: getRandomItemFromArray(EYES_COLORS)
  });
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && setupUserName !== document.activeElement) {
    closePopup();
  }
};

var onSetupSubmitClick = function () {
  wizardForm.submit();
};

var onSetupSubmitPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    wizardForm.submit();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setupSubmit.addEventListener('click', onSetupSubmitClick);
  setupSubmit.addEventListener('keydown', onSetupSubmitPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  userDialog.removeAttribute('style');
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupCoat.addEventListener('click', function () {
  setupPlayerElements[0].value = getRandomItemFromArray(COAT_COLORS);
  setupWizard.querySelector('.wizard-coat').style.fill = setupPlayerElements[0].value;
});

setupEyes.addEventListener('click', function () {
  setupPlayerElements[1].value = getRandomItemFromArray(EYES_COLORS);
  setupWizard.querySelector('.wizard-eyes').style.fill = setupPlayerElements[1].value;
});

setupFireball.addEventListener('click', function () {
  setupPlayerElements[2].value = getRandomItemFromArray(FIREBALL_COLORS);
  setupFireball.style.background = setupPlayerElements[2].value;
});

setupUserName.addEventListener('change', function () {
  setupSubmit.disabled = !setupUserName.checkValidity();
});
