class Kayak {
  constructor() {
    this.w = 16;
    this.h = 74;
    this.x = 167;
    this.y = 200;
  }
  draw() {
    var img = new Image();
    img.src = "./img/kajak.png";
    ctx.drawImage(img, this.x, this.y);
  }
}

const kayak = new Kayak();
