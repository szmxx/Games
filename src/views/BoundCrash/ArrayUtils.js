export default class Bound {
  constructor(x, y, dirX, dirY, radius, color, context) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dirX = dirX;
    this.dirY = dirY;
    this.color = color;
    this.ctx = context;
  }
  // 检测边界
  DetectBound() {
    let width = window.innerWidth,
      height = window.innerHeight;
    if (this.x + this.radius >= width) {
      this.dirX = -this.dirX;
    } else if (this.x - this.radius <= 0) {
      this.dirX = -this.dirX;
    } else if (this.y - this.radius <= 0) {
      this.dirY = -this.dirY;
    } else if (this.y + this.radius >= height) {
      this.dirY = -this.dirY;
    }
    this.x += this.dirX;
    this.y += this.dirY;
  }
  // 检测两球相撞
  DetectCrash(balls) {
    let bounds = balls;
    for (let i = 0; i < bounds.length; i++) {
      if (this !== bounds[i]) {
        let a = this.x - bounds[i].x,
          b = this.y - bounds[i].y;

        let distance = Math.sqrt(a * a + b * b);
        if (distance <= this.radius + bounds[i].radius) {
          if (a * this.dirX > 0) {
            this.dirX = this.dirX
          } else {
            this.dirX = -this.dirX;
          }
          if (a * bounds[i].dirX > 0) {
            bounds[i].dirX = -bounds[i].dirX
          }
          if (b * this.dirY > 0) {
            this.dirY = this.dirY;
          } else {
            this.dirY = -this.dirY;
          }
          if (b * bounds[i].dirY > 0) {
            bounds[i].dirY = -bounds[i].dirY;
          }
          // this.dirX = -this.dirX;
          // this.dirY = -this.dirY;
          // bounds[i].dirX = -bounds[i].dirX;
          // bounds[i].dirY = -bounds[i].dirY;
        }
      }
    }
  }
  drawBound(img) {
    // this.ctx.beginPath();
    // this.ctx.fillStyle = this.color;
    this.ctx.drawImage(img, this.x + this.radius, this.y + this.radius, 2 * this.radius, 2 * this.radius)
    // this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    // this.ctx.fill();
  }
}