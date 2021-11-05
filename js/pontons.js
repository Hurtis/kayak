class Pontons {
  constructor() {
    this.pontonImg = "./img/ponton-red.png";
    this.w = 28;
    this.h = 125;
    this.left = {
      x: 0,
      y: -50,
    };
    this.right = {
      x: 0,
      y: 100,
    };
    this.spacing = 10;
  }
  pontonRandomDelay() {
    return Math.floor(Math.random() * 5) * 100;
  }

  drawLeft(width, river) {
    //ponton
    let img = new Image();
    img.src = this.pontonImg;
    ctx.drawImage(img, width / 2 - river / 2 + this.spacing, this.left.y);
    this.left.x = width / 2 - river / 2 + this.spacing;

    //anchor rope 1
    ctx.beginPath();
    ctx.moveTo(this.left.x, this.left.y + this.h / 4);
    ctx.lineTo(
      this.left.x - this.spacing,
      this.left.y + this.h / 4 - this.spacing
    );
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#666";
    ctx.stroke();
    //anchor rope 2
    ctx.beginPath();
    ctx.moveTo(this.left.x, this.left.y + (3 * this.h) / 4);
    ctx.lineTo(
      this.left.x - this.spacing,
      this.left.y + (3 * this.h) / 4 + this.spacing
    );
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#666";
    ctx.stroke();
  }

  drawRight(width, river) {
    let img = new Image();
    img.src = this.pontonImg;
    ctx.drawImage(
      img,
      width / 2 + river / 2 - this.w - this.spacing,
      this.right.y
    );
    this.right.x = width / 2 + river / 2 - this.w - this.spacing;

    //anchor rope 1
    ctx.beginPath();
    ctx.moveTo(this.right.x + this.w, this.right.y + this.h / 4);
    ctx.lineTo(
      this.right.x + this.w + this.spacing,
      this.right.y + this.h / 4 - this.spacing
    );
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#666";
    ctx.stroke();
    //anchor rope 2
    ctx.beginPath();
    ctx.moveTo(this.right.x + this.w, this.right.y + (3 * this.h) / 4);
    ctx.lineTo(
      this.right.x + this.w + this.spacing,
      this.right.y + (3 * this.h) / 4 + this.spacing
    );
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#666";
    ctx.stroke();
  }

  moveLeft(height, stream) {
    this.left.y += stream;
    if (this.left.y > height) {
      this.left.y = (this.h + this.pontonRandomDelay()) * -1;
    }
  }

  moveRight(height, stream) {
    this.right.y += stream;
    if (this.right.y > height) {
      this.right.y = (this.h + this.pontonRandomDelay()) * -1;
    }
  }
}

const ponton = new Pontons();
