'use strict';
(function () {
  const COAT_COLORS = [
    `rgb(101, 137, 164)`,
    `rgb(241, 43, 107)`,
    `rgb(146, 100, 161)`,
    `rgb(56, 159, 117)`,
    `rgb(215, 210, 55)`,
    `rgb(0, 0, 0)`
  ];
  const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
  const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
  const WIZARD_COUNT = 4;
  const userDialog = document.querySelector(`.setup`);
  const similarListElement = userDialog.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);
  const wizardOriginal = userDialog.querySelector(`.wizard`);
  const wizardCoat = wizardOriginal.querySelector(`.wizard-coat`);
  const wizardEyes = userDialog.querySelector(`.wizard-eyes`);
  const wizardFireball = userDialog.querySelector(`.setup-fireball-wrap`);
  const form = document.querySelector(`.setup-wizard-form`);

  const getRandomItem = (arr) => {
    return Math.floor(Math.random() * arr.length);
  };

  const renderWizard = function (wizard) {
    const wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardElement;
  };

  const showSimilarBlock = () => {
    userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  const successHandeler = (wizards) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < WIZARD_COUNT; i++) {
      fragment.appendChild(renderWizard(wizards[getRandomItem(wizards)]));
    }
    similarListElement.appendChild(fragment);
    userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    const formData = new FormData(form);
    window.backend.save(formData, window.dialog.close, errorHandler);
  };

  form.addEventListener(`submit`, formSubmitHandler);

  const wizardClickHandler = (evt) => {
    if (evt.target.classList.contains(`wizard-coat`)) {
      const coatColorRandom = COAT_COLORS[getRandomItem(COAT_COLORS)];
      wizardCoat.style.fill = coatColorRandom;
      userDialog.querySelector(`.coat-color`).value = coatColorRandom;
    } else if (evt.target.classList.contains(`wizard-eyes`)) {
      const eyesColorRandom = EYES_COLORS[getRandomItem(EYES_COLORS)];
      wizardEyes.style.fill = eyesColorRandom;
      userDialog.querySelector(`.eyes-color`).value = eyesColorRandom;
    }
  };

  const fireballClickHandler = () => {
    const fireballColorRandom = FIREBALL_COLORS[getRandomItem(FIREBALL_COLORS)];
    wizardFireball.style.backgroundColor = fireballColorRandom;
    wizardFireball.querySelector(`.fireball-color`).value = fireballColorRandom;
  };

  wizardOriginal.addEventListener(`click`, wizardClickHandler);
  wizardFireball.addEventListener(`click`, fireballClickHandler);


  showSimilarBlock();
  window.backend.load(successHandeler, errorHandler);

})();


