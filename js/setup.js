'use strict';

const NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
const SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
const COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
const EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
const WIZARD_COUNT = 4;
const wizards = [];

const getRandomItem = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

const getWizard = (names, surnames, coatColors, eyesColors) => {
  const item = {};
  item.name = names[getRandomItem(names)] + ' ' + surnames[getRandomItem(surnames)];
  item.coatColor = coatColors[getRandomItem(coatColors)];
  item.eyesColor = eyesColors[getRandomItem(eyesColors)];
  return item;
};

const fillWizardList = (wizardCount) => {
  for(let i = 0; i < wizardCount; i++) {
    wizards.push(getWizard(NAMES, SURNAMES, COAT_COLORS, EYES_COLORS));
  }
};

const showSetupBlock = () => {
  const userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');

  return userDialog;
};

const renderSimilarBlock = (userDialog) => {
  const similarListElement = userDialog.querySelector('.setup-similar-list');

  const similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  similarListElement.appendChild(getFragment(wizards, similarWizardTemplate));
};

const getFragment = (wizards, template) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i], template));
  }

  return fragment;
};

const renderWizard = function(wizard, template) {
  console.log(template);
  const wizardElement = template.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  console.log(wizard.coatColor);

  return wizardElement;
};

const showSimilarBlock = (userDialog) => {
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

const userDialog = showSetupBlock();
fillWizardList(WIZARD_COUNT);
renderSimilarBlock(userDialog);
showSimilarBlock(userDialog);

