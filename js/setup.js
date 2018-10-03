'use strict';
(function () {
  var wizardsAmount = 4;

  var wizardSetup = document.querySelector('.setup');
  var wizardSetupClose = wizardSetup.querySelector('.setup-close');
  var wizardSetupName = wizardSetup.querySelector('.setup-user-name');
  var wizardSetupForm = wizardSetup.querySelector('.setup-wizard-form');
  var wizardSetupControl = document.querySelector('.setup-open');

  var similarSetup = document.querySelector('.setup-similar');
  var similarWizards = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content;
  var similarWizardDraft = similarWizardTemplate
    .querySelector('.setup-similar-item');

  var createWizard = function (wizard) {
    var wizardItem = similarWizardDraft.cloneNode(true);

    if (wizard) {
      wizardItem.querySelector('.setup-similar-label').textContent = wizard.name;
      wizardItem.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
      wizardItem.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    }

    return wizardItem;
  };

  var renderSimilarWizards = function () {
    var getWizards = function (data) {
      var wizards = data.slice(0, wizardsAmount);

      similarWizards.textContent = '';

      wizards.forEach(function () {
        similarWizards.appendChild(createWizard(window.util.getRandomItemFromArray(data)));
      });
    };

    var renderError = function (error) {
      window.util.showError(error);
    };

    window.backend.load(getWizards, renderError);

    similarSetup.classList.remove('hidden');
  };

  var showSetup = function () {
    wizardSetup.classList.remove('hidden');
    wizardSetupClose.focus();
    addSetupWindowListeners();
    renderSimilarWizards();
  };

  var hideSetup = function () {
    wizardSetup.classList.add('hidden');
    removeSetupWindowListeners();
    window.util.hideError();
  };

  var renderError = function (error) {
    window.util.showError(error);
  };

  var setupControlClickHandler = function () {
    showSetup();
  };

  var setupCloseClickHandler = function () {
    hideSetup();
  };

  var setupControlKeydownHandler = function (evt) {
    window.util.isEnterEvent(evt, showSetup);
  };

  var setupCloseEnterHandler = function (evt) {
    window.util.isEscEvent(evt, hideSetup);
  };

  var setupCloseEscHandler = function (evt) {
    if (evt.target !== wizardSetupName) {
      window.util.isEscEvent(evt, hideSetup);
    }
  };

  var wizardSetupControlListeners = function () {
    wizardSetupControl.addEventListener('click', setupControlClickHandler);
    wizardSetupControl.addEventListener('keydown', setupControlKeydownHandler);
  };

  var initSetupControls = function () {
    wizardSetupControlListeners();
  };

  var wizardSetupFormSubmitHandler = function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(wizardSetupForm), hideSetup, renderError);
  };

  var addSetupWindowListeners = function () {
    wizardSetup.addEventListener('keydown', setupCloseEscHandler);
    wizardSetupClose.addEventListener('click', setupCloseClickHandler);
    wizardSetupClose.addEventListener('keydown', setupCloseEnterHandler);
    wizardSetupForm.addEventListener('submit', wizardSetupFormSubmitHandler);
  };

  var removeSetupWindowListeners = function () {
    wizardSetup.removeEventListener('keydown', setupCloseEscHandler);
    wizardSetupClose.removeEventListener('click', setupCloseClickHandler);
    wizardSetupClose.removeEventListener('keydown', setupCloseEnterHandler);
    wizardSetup.removeAttribute('style');
    wizardSetupForm.removeEventListener('submit', wizardSetupFormSubmitHandler);
  };

  initSetupControls();

})();
