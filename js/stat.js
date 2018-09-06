'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomNumber = function (min, max) {
  var number = Math.random() * (max - min) + min;
  return number;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', (CLOUD_X + GAP) * 2, CLOUD_Y + GAP * 3);
  ctx.fillText('Список результатов:', (CLOUD_X + GAP) * 2, CLOUD_Y + GAP * 2 + FONT_GAP * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var barHeight = BAR_HEIGHT / maxTime * Math.round(times[i]);
    var barX = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var barY = CLOUD_Y + GAP * 5 + FONT_GAP * 2 + (BAR_HEIGHT - barHeight);
    var timeX = barX;
    var timeY = CLOUD_Y + GAP * 3 + FONT_GAP * 3 + (BAR_HEIGHT - barHeight);
    var textX = barX;
    var textY = CLOUD_Y + GAP * 7 + FONT_GAP * 2 + BAR_HEIGHT;
    var opacity = getRandomNumber(0.1, 1);

    ctx.fillText(Math.round(times[i]), timeX, timeY);
    ctx.fillStyle = 'rgba(0, 0, 255,' + opacity + ')';
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);
    ctx.fillStyle = 'black';
    ctx.fillText(players[i], textX, textY);
  }
};
