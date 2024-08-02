import { Circle } from './circle.js';
import reload from './controls.js';

let idInterval = null;
const refs = {
  canvas: document.querySelector('.js-canvas1'),
  canvas2: document.querySelector('.js-canvas2'),
  saveBtn: document.querySelector('.js-save-btn'),
};

const options = {
  circlesX: [],
  circlesY: [],
  LENX: 5,
  LENY: 5,
  CIRCLE_RADIUS: 50,
  colorBrush: 'blue',
  widthBrush: 2,
};

refs.canvas.width = options.LENX * (options.CIRCLE_RADIUS * 2 + 20);
refs.canvas.height = options.LENY * (options.CIRCLE_RADIUS * 2 + 20);
refs.canvas2.width = options.LENX * (options.CIRCLE_RADIUS * 2 + 20);
refs.canvas2.height = options.LENY * (options.CIRCLE_RADIUS * 2 + 20);

function init() {
  if (idInterval) clearInterval(idInterval);

  for (let i = 0; i < options.LENX; i++) {
    const center = {
      x: i * (options.CIRCLE_RADIUS * 2 + 20),
      y: 0 * (options.CIRCLE_RADIUS * 2 + 20),
    };
    options.circlesX[i] = new Circle({
      canvas: refs.canvas,
      center,
      step: i + 1,
      radius: options.CIRCLE_RADIUS,
    });
  }
  for (let i = 0; i < options.LENY; i++) {
    const center = {
      x: 0 * (options.CIRCLE_RADIUS * 2 + 20),
      y: i * (options.CIRCLE_RADIUS * 2 + 20),
    };
    options.circlesY[i] = new Circle({
      canvas: refs.canvas,
      center,
      step: i + 1,
      radius: options.CIRCLE_RADIUS,
    });
  }

  idInterval = setInterval(() => {
    Circle.clearCanvas();
    drawCircles();
  }, 10);
}
init();
function drawCircles() {
  for (let i = 1; i < options.LENX; i++) {
    options.circlesX[i].nextIteration();
    options.circlesX[i].show();
  }
  for (let i = 1; i < options.LENY; i++) {
    options.circlesY[i].nextIteration();
    options.circlesY[i].show();
  }

  for (let i = 1; i < options.LENX; i++) {
    for (let j = 1; j < options.LENY; j++) {
      const x = options.circlesX[i].currentPoint.x;
      const y = options.circlesY[j].currentPoint.y;
      drawPoint(x, y);

      // drawLine(options.circlesX[i].currentPoint, {
      //   x: x,
      //   y: options.circlesY[j].currentPoint.y,
      // });

      // drawLine(options.circlesY[j].currentPoint, {
      //   x: options.circlesX[i].currentPoint.x,
      //   y: options.circlesY[j].currentPoint.y,
      // });
    }
  }
}

function drawPoint(x, y) {
  const RADIUS = options.widthBrush;
  const canvas = refs.canvas2.getContext('2d');
  canvas.fillStyle = options.colorBrush;
  canvas.beginPath();
  canvas.ellipse(x, y, RADIUS, RADIUS, 0, 0, 2 * Math.PI);
  canvas.fill();
  canvas.beginPath();
  canvas.fillStyle = 'black';
}

function drawLine(startPos, endPos) {
  Circle.canvas.moveTo(startPos.x, startPos.y);
  Circle.canvas.lineTo(endPos.x, endPos.y);
  Circle.canvas.stroke();
}

refs.saveBtn.addEventListener('click', () => {
  let downloadLink = document.createElement('a');
  downloadLink.setAttribute('download', 'CanvasAsImage.png');
  let dataURL = refs.canvas2.toDataURL('image/png');
  let url = dataURL.replace(
    /^data:image\/png/,
    'data:application/octet-stream'
  );
  downloadLink.setAttribute('href', url);
  downloadLink.click();
});

document.querySelector('.js-control-form').addEventListener('submit', e => {
  e.preventDefault();
  Circle.clearCanvas();
  const canvas = refs.canvas2.getContext('2d');
  canvas.clearRect(0, 0, 10000, 10000);
  reload(init, options, e.target);
});
