'use strict';

const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
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
const wizards = [];
const userDialog = document.querySelector(`.setup`);
const setupOpen = document.querySelector(`.setup-open`);
const setupClose = userDialog.querySelector(`.setup-close`);
const similarListElement = userDialog.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);
const wizardOriginal = userDialog.querySelector(`.wizard`);
const wizardCoat = wizardOriginal.querySelector(`.wizard-coat`);
const wizardEyes = userDialog.querySelector(`.wizard-eyes`);
const wizardFireball = userDialog.querySelector(`.setup-fireball-wrap`);

const getRandomItem = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

const getWizard = (names, surnames, coatColors, eyesColors) => {
  const item = {};
  item.name = names[getRandomItem(names)] + ` ` + surnames[getRandomItem(surnames)];
  item.coatColor = coatColors[getRandomItem(coatColors)];
  item.eyesColor = eyesColors[getRandomItem(eyesColors)];
  return item;
};

const fillWizardList = (wizardCount) => {
  for (let i = 0; i < wizardCount; i++) {
    wizards.push(getWizard(NAMES, SURNAMES, COAT_COLORS, EYES_COLORS));
  }
};

const setupEscPressHandler = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeSetup();
  }
};

const showSetup = () => {
  userDialog.classList.remove(`hidden`);

  document.addEventListener(`keydown`, setupEscPressHandler);
};

setupOpen.addEventListener(`click`, function () {
  showSetup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    showSetup();
  }
});

const closeSetup = () => {
  userDialog.classList.add(`hidden`);

  document.removeEventListener(`keydown`, setupEscPressHandler);
};

setupClose.addEventListener(`click`, function () {
  closeSetup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closeSetup();
  }
});


const renderSimilarBlock = () => {
  similarListElement.appendChild(getFragment(similarWizardTemplate));
};

const getFragment = (template) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i], template));
  }

  return fragment;
};

const renderWizard = function (wizard, template) {
  const wizardElement = template.cloneNode(true);
  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const showSimilarBlock = () => {
  userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
};


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

showSetup();
fillWizardList(WIZARD_COUNT);
renderSimilarBlock();
showSimilarBlock();

