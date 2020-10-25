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
  const EYES_COLORS = [
    `red`,
    `orange`,
    `yellow`,
    `green`,
    `lightblue`,
    `blue`,
    `purple`
  ];

  const FIREBALL_COLORS = [
    `#ee4830`,
    `#30a8ee`,
    `#5ce6c0`,
    `#e848d5`,
    `#e6e848`
  ];

  const wizard = {
    onEyesChange: () => {},
    onCoatChange: () => {}
  };


  const userDialog = document.querySelector(`.setup`);
  const wizardFireball = userDialog.querySelector(`.setup-fireball-wrap`);
  const wizardOriginal = userDialog.querySelector(`.wizard`);
  const wizardCoat = wizardOriginal.querySelector(`.wizard-coat`);
  const wizardEyes = userDialog.querySelector(`.wizard-eyes`);

  wizardCoat.addEventListener(`click`, () => {
    const coatColorRandom = window.util.getRandomItem(COAT_COLORS);
    wizardCoat.style.fill = coatColorRandom;
    wizard.onCoatChange(coatColorRandom);
  });

  wizardEyes.addEventListener(`click`, () => {
    const eyesColorRandom = window.util.getRandomItem(EYES_COLORS);
    wizardEyes.style.fill = eyesColorRandom;
    wizard.onEyesChange(eyesColorRandom);
  });

  const fireballClickHandler = () => {
    const fireballColorRandom = window.util.getRandomItem(FIREBALL_COLORS);
    wizardFireball.style.backgroundColor = fireballColorRandom;
    wizardFireball.querySelector(`.fireball-color`).value = fireballColorRandom;
  };

  wizardFireball.addEventListener(`click`, fireballClickHandler);


  window.wizard = {
    object: wizard
  };
})();
