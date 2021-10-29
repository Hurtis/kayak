class Ships {
  constructor() {
    this.right = {
      w: 40,
      h: 111,
      x: 190,
      y: 1000,
      url: "./img/ship-right.png",
      speed: 1,
    };
    this.left = {
      w: 40,
      h: 111,
      x: 120,
      y: -200,
      url: "./img/ship-left.png",
      speed: 1,
    };
  }
  shipRandomDelay() {
    return Math.floor(Math.random() * 8) * 100;
  }
  drawShip(name) {
    var img = new Image();
    img.src = name.url;
    ctx.drawImage(img, name.x, name.y);
  }
  moveRightShip(height, stream) {
    this.right.y = this.right.y - stream - this.right.speed;
    if (this.right.y + this.right.h < 0) {
      this.right.y = this.shipRandomDelay() + height;
    }
  }
  moveLeftShip(height, stream) {
    this.left.y = this.left.y + stream + this.left.speed;
    if (this.left.y > height) {
      this.left.y = (this.left.h + this.shipRandomDelay()) * -1;
    }
  }
}

const ship = new Ships();
