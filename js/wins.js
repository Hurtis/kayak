class Wins {
  constructor() {
    this.coin = {
      w: 21,
      h: 21,
      x: 75,
      y: 300,
      url: "./img/coin.png",
    };
    this.diamond = {
      w: 20,
      h: 20,
      x: 270,
      y: -200,
      url: "./img/diamond.png",
    };
  }
  winRandomDelay(number) {
    return Math.floor(Math.random() * number) * 100;
  }

  winRandomPosition() {
    let newX = Math.floor(Math.random() * (295 - 35) + 35);
    // not in the middle safe zone
    if (newX > 155 && newX < 195) {
      if (Math.random() < 0.5) {
        newX = newX + 50;
      } else {
        newX = newX - 50;
      }
    }
    // not in the left safe zone
    if (newX > 73 && newX < 110) {
      newX = newX + 37;
    }
    // not in the right safe zone
    if (newX > 240 && newX < 277) {
      newX = newX - 37;
    }
    return newX;
  }
  drawWin(name) {
    let img = new Image();
    img.src = name.url;
    ctx.drawImage(img, name.x, name.y);
  }
  changeWinPosition(objedct, objectDelay) {
    objedct.y = (objedct.h + this.winRandomDelay(objectDelay)) * -1;
    objedct.x = this.winRandomPosition();
  }
  moveWin(name, delay, height, stream) {
    name.y = name.y + stream;
    if (name.y > height) {
      this.changeWinPosition(name, delay);
    }
  }
}

const wins = new Wins();
