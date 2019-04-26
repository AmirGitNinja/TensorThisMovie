import { load } from '@tensorflow-models/coco-ssd';


const vid = document.getElementById('vid');
const btn = document.getElementById('btn');
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const mainDiv = document.getElementById("main");
const loaderDiv = document.getElementById("loading");
const playBtnDiv = document.getElementById("playBtn");

let runInterval;
let model;
let isRun = false;

async function init() {
  model = await load();
  mainDiv.classList.remove('hide');
  loaderDiv.classList.add('hide');
}

async function run() {
  const predictions = await model.detect(vid);
  // console.log(predictions);

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const font = '16px sans-serif';
  ctx.font = font;
  ctx.textBaseline = 'top';
  predictions.map(prediction => Object.assign({}, prediction, { rectColor: calculateRectColorByScore(prediction.score) }))
    .forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      // Draw the bounding box.
      ctx.strokeStyle = prediction.rectColor;
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);
      // Draw the label background.
      ctx.fillStyle = prediction.rectColor;

      const percentageValue = Math.floor(prediction.score * 100);
      const text = `${prediction.class}: ${percentageValue}%`;
      const textWidth = ctx.measureText(text).width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

      // Draw the text last to ensure it's on top.
      const xText = prediction.bbox[0];
      const yText = prediction.bbox[1];
      ctx.fillStyle = '#000000';
      ctx.fillText(text, xText, yText + 1);
    });
}

function calculateRectColorByScore(score) {
  if (score > 0.9) {
    return '#00ff00';
  } else if (score > 0.7 && score <= 0.9) {
    return '#FFFF00';
  } else {
    return '#ff0000';
  }
}

function onVideoStarted() {
  if (!isRun) {
    isRun = true;
    runInterval = setInterval(run, 500);
  }
};

function onVideoPaused() {
  isRun = false

  if (runInterval) {
    clearInterval(runInterval);
  }
}

async function onPlayButtonClick() {
  try {
    playBtnDiv.classList.add('hide');
    await vid.play();
  } catch (e) {
    console.error(e.toString());
  }
}


function initTensor() {
  setTimeout(() => {
    init();
  }, 500);
}

// Init Tensor model object:
if (window.addEventListener) {
  window.addEventListener('load', initTensor, false); //W3C
} else {
  window.attachEvent('onload', initTensor); //IE
}

// Register events:
vid.addEventListener('play', onVideoStarted)
vid.addEventListener('pause', onVideoPaused);
playBtnDiv.addEventListener('click', onPlayButtonClick);