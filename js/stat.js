'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 50;
var CLOUD_GAP = 10;
var TEXT_HEIGHT = 15;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var TITLE_HEIGHT = 30;
var TITLE_MARGIN_X = 30;
var TITLE_MARGIN_Y = 20;
var START_Y = TEXT_HEIGHT + BAR_HEIGHT + GAP + TITLE_HEIGHT

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getSaturation = function randomInt(min, max) {
	return Math.random() * (max - min) + min;
}
var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function(ctx, names, times) {
  renderCloud(
    ctx,
    CLOUD_X + CLOUD_GAP,
    CLOUD_Y + CLOUD_GAP,
    'rgba(0, 0, 0, 0.3)'
  );
  renderCloud(
    ctx,
    CLOUD_X,
    CLOUD_Y,
    '#fff'
  );

  ctx.fillStyle = '#000';

  var maxTime = getMaxElement(times);
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText(
    'Ура вы победили!',
    CLOUD_X + TITLE_MARGIN_X,
    CLOUD_Y + TITLE_MARGIN_Y
  );

  ctx.fillText(
    'Список результатов:',
    CLOUD_X + TITLE_MARGIN_X,
    CLOUD_Y + 2 * TITLE_MARGIN_Y
  )

  ctx.font = '15px Arial'

  for (var i = 0; i < names.length; i++) {
    ctx.fillText(
      names[i],
      CLOUD_X + GAP + (BAR_WIDTH + GAP) * i,
      START_Y + TEXT_HEIGHT
    );
    names[i] === 'Вы' ? ctx.fillStyle = 'hsl(0, 100%, 50%)' : ctx.fillStyle = 'hsl(240,'+ getSaturation(0, 100) +'%, 50%)';

    ctx.fillRect(
      CLOUD_X + GAP + (BAR_WIDTH + GAP) * i,
      START_Y,
      BAR_WIDTH,
      -(BAR_HEIGHT * times[i]/maxTime)
    );

    ctx.fillStyle = 'black';

    ctx.fillText(
      Math.round(times[i]),
      CLOUD_X + GAP + (BAR_WIDTH + GAP) * i,
      START_Y -(BAR_HEIGHT * times[i]/maxTime) - TEXT_HEIGHT
    )
  }
};
