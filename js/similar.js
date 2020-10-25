'use strict';

(function () {
  const MAX_SIMILAR_WIZARD_COUNT = 4;
  const userDialog = document.querySelector(`.setup`);
  const similar = userDialog.querySelector(`.setup-similar`);
  const similarList = userDialog.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content;


  const renderWizard = function (wizard) {
    const wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;
    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;

    return wizardElement;
  };

  const renderSimilarWizards = (wizards) => {
    const fragment = document.createDocumentFragment();
    const takeNumber = wizards.length > MAX_SIMILAR_WIZARD_COUNT
      ? MAX_SIMILAR_WIZARD_COUNT
      : wizards.length;

    similarList.innerHTML = ``;

    for (let i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarList.appendChild(fragment);
    similar.classList.remove(`hidden`);
  };

  window.similar = {
    render: renderSimilarWizards
  };

})();
