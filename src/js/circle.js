export class Circle {
  static #canvas;
  radius = 25;
  center = new Point();
  angle = 0;
  currentPoint = new Point();

  constructor({ canvas, center, step = 1, radius = 25 }) {
    const { x, y } = center;
    this.center = new Point(x, y);
    this.radius = radius;
    Circle.#canvas = canvas.getContext('2d');
    Circle.#canvas.lineWidth = 5;
    Circle.#canvas.lineCap = 'round';
    this.step = step;
  }

  show() {
    Circle.#canvas.fillStyle = 'black';
    const center = this.center;
    this.drawEllipse(center);
    this.drawLine(center, this.currentPoint);
  }

  nextIteration() {
    const speed = +(Math.abs(this.angle - 180) / 90).toFixed(2);
    this.angle += this.step; // + speed;
    this.angle %= 360;

    const slice = (2 * Math.PI) / 360;
    this.currentPoint.x =
      this.radius * Math.cos(this.angle * slice) + this.center.x;
    this.currentPoint.y =
      this.radius * Math.sin(this.angle * slice) + this.center.y;
  }

  // =======================================

  drawLine(startPos, endPos) {
    Circle.#canvas.moveTo(startPos.x, startPos.y);
    Circle.#canvas.lineTo(endPos.x, endPos.y);
    Circle.#canvas.stroke();
    this.drawDot(endPos);
  }

  drawDot(center) {
    Circle.#canvas.fillStyle = 'red';
    Circle.#canvas.beginPath();
    Circle.#canvas.ellipse(center.x, center.y, 5, 5, 0, 0, 2 * Math.PI);
    Circle.#canvas.fill();
    Circle.#canvas.beginPath();
    Circle.#canvas.fillStyle = 'black';
  }

  drawEllipse(center) {
    Circle.#canvas.beginPath();
    Circle.#canvas.ellipse(
      center.x,
      center.y,
      this.radius,
      this.radius,
      0,
      0,
      2 * Math.PI
    );
    Circle.#canvas.closePath();
    Circle.#canvas.strokeStyle = 'black';
    Circle.#canvas.stroke();
  }

  static clearCanvas() {
    Circle.#canvas.clearRect(0, 0, 10000, 10000);
  }

  static get canvas() {
    return this.#canvas;
  }
}

class Point {
  #PADDING = 60;
  x;
  y;
  constructor(x = 0, y = 0) {
    this.x = x + this.#PADDING;
    this.y = y + this.#PADDING;
  }
}
