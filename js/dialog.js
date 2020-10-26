'use strict';


const userDialog = document.querySelector(`.setup`);
const setupOpen = document.querySelector(`.setup-open`);
const setupClose = userDialog.querySelector(`.setup-close`);
const dialogHandle = userDialog.querySelector(`.upload`);

const showDialog = () => {
  const resetDialogStyle = () => {
    userDialog.style = ``;
  };

  userDialog.classList.remove(`hidden`);
  document.addEventListener(`keydown`, function (evt) {
    window.util.isEscEvent(evt, closeDialog);
  });
  resetDialogStyle();

};

const closeDialog = () => {
  userDialog.classList.add(`hidden`);
  document.removeEventListener(`keydown`, function (evt) {
    window.util.isEscEvent(evt, closeDialog);
  });
};

setupClose.addEventListener(`click`, function () {
  closeDialog();
});

setupClose.addEventListener(`keydown`, function (evt) {
  window.util.isEnterEvent(evt, closeDialog);
});

setupOpen.addEventListener(`click`, function () {
  showDialog();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  window.util.isEnterEvent(evt, showDialog);
});

dialogHandle.addEventListener(`mousedown`, function (evt) {
  evt.preventDefault();
  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  let dragged = false;

  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    dragged = true;

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    userDialog.style.top = (userDialog.offsetTop - shift.y) + `px`;
    userDialog.style.left = (userDialog.offsetLeft - shift.x) + `px`;
  };

  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    if (dragged) {
      const onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        dialogHandle.removeEventListener(`click`, onClickPreventDefault);
      };
      dialogHandle.addEventListener(`click`, onClickPreventDefault);
    }

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };
  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

window.dialog = {
  close: closeDialog
};

