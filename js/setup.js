'use strict';
(function () {
  var wizardsAmount = 4;
  var wizards = [];

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

  var setupUserName = setup.querySelector('.setup-user-name');
  setup.classList.add('hidden');

  for (var i = 1; i <= wizardsAmount; i++) {
    wizards.push({
      name: window.util.getRandomItemFromArray(window.util.WIZARD_NAMES) + window.util.getRandomItemFromArray(window.util.WIZARD_SURNAMES),
      coatColor: window.util.getRandomItemFromArray(window.util.COAT_COLORS),
      eyesColor: window.util.getRandomItemFromArray(window.util.EYES_COLORS)
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
    if (setupUserName !== document.activeElement) {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  var onSetupSubmitClick = function () {
    wizardForm.submit();
  };

  var onSetupSubmitPress = function (evt) {
    window.util.isEnterEvent (evt, wizardForm.submit);
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
    window.util.isEnterEvent (evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent (evt, closePopup);
  });


  setupUserName.addEventListener('change', function () {
    setupSubmit.disabled = !setupUserName.checkValidity();
  });
})();
