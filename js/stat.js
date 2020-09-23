'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 50;
const CLOUD_GAP = 10;
const TEXT_HEIGHT = 15;
const BAR_WIDTH = 40;
const BAR_HEIGHT = 150;
const TITLE_HEIGHT = 30;
const TITLE_MARGIN_X = 30;
const TITLE_MARGIN_Y = 20;
const START_Y = TEXT_HEIGHT + BAR_HEIGHT + GAP + TITLE_HEIGHT;

const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const renderText = (ctx, text, x, y, color = `black`, font = `16px PT Mono`) => {
  ctx.textBaseline = `hanging`;
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

const renderBar = (ctx, x, h, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, START_Y, BAR_WIDTH, h);
};

const renderBarInformative = (ctx, names, times) => {
  const maxTime = getMaxElement(times);
  for (let i = 0; i < names.length; i++) {
    const BAR_X = CLOUD_X + GAP + (BAR_WIDTH + GAP) * i;
    renderText(
        ctx,
        names[i],
        BAR_X,
        START_Y + TEXT_HEIGHT
    );
    renderBar(
        ctx,
        BAR_X,
        -(BAR_HEIGHT * times[i] / maxTime),
        (names[i] === `Вы`) ? `hsl(0, 100%, 50%)` : `hsl(240,` + getSaturation(0, 100) + `%, 50%)`
    );
    renderText(
        ctx,
        Math.round(times[i]),
        BAR_X,
        START_Y - (BAR_HEIGHT * times[i] / maxTime) - TEXT_HEIGHT
    );
  }
};

const getSaturation = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getMaxElement = (arr) => {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = (ctx, names, times) => {
  renderCloud(
      ctx,
      CLOUD_X + CLOUD_GAP,
      CLOUD_Y + CLOUD_GAP,
      `rgba(0, 0, 0, 0.3)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  renderText(
      ctx,
      `Ура вы победили!`,
      CLOUD_X + TITLE_MARGIN_X,
      CLOUD_Y + TITLE_MARGIN_Y
  );
  renderText(
      ctx,
      `Список результатов:`,
      CLOUD_X + TITLE_MARGIN_X,
      CLOUD_Y + 2 * TITLE_MARGIN_Y
  );
  renderBarInformative(ctx, names, times);

};
