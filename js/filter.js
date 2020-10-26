'use strict';


let coatColor = `rgb(101, 137, 164)`;
let eyesColor = `black`;
let wizards = [];

const getRank = function (wizard) {
  let rank = 0;

  if (wizard.colorCoat === coatColor) {
    rank += 2;
  }
  if (wizard.colorEyes === eyesColor) {
    rank += 1;
  }

  return rank;
};

const namesComparator = function (left, right) {
  if (left > right) {
    return 1;
  } else if (left < right) {
    return -1;
  } else {
    return 0;
  }
};

const updateWizards = function () {
  window.similar.render(wizards.sort(function (left, right) {
    let rankDiff = getRank(right) - getRank(left);
    if (rankDiff === 0) {
      rankDiff = namesComparator(left.name, right.name);
    }
    return rankDiff;
  }));
};

window.wizard.object.onCoatChange = window.debounce(function (color) {
  coatColor = color;
  updateWizards();
});

window.wizard.object.onEyesChange = window.debounce(function (color) {
  eyesColor = color;
  updateWizards();
});

window.wizard.setEyesChangeHandler = window.debounce(function (color) {
  coatColor = color;
  updateWizards();
});

const successHandler = function (data) {
  wizards = data;
  updateWizards();
};

window.filter = {
  successHandler
};

