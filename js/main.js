document.addEventListener("keydown", keyPush);
let control = document.getElementById("controlButton");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const speed = 5;
canvas.width = 350;
canvas.height = 400;
let stream = 1;
let game = false;
let end = false;
let score = 0;
let level = 0;
let scoreBoard = document.getElementById("score");
let levelBoard = document.getElementById("level");
scoreBoard.innerHTML = score;
levelBoard.innerHTML = level + 1;
// ----------------------//
// -----GAME CONTROL-----//
// ----------------------//

// control button
control.onclick = function (event) {
  event.preventDefault();
  if (game) {
    stopGame();
  } else {
    if (end) {
      location.reload();
    } else {
      startGame();
    }
  }
};
startGame = () => {
  game = true;
  control.innerHTML = control.innerHTML.replace("start", "stop");
};
stopGame = () => {
  game = false;
  control.innerHTML = control.innerHTML.replace("stop", "start");
};

// kayak control
function keyPush(event) {
  if (game === true) {
    switch (event.key) {
      case "ArrowUp":
        kayak.y -= speed;
        break;
      case "ArrowDown":
        kayak.y += speed;
        break;
      case "ArrowRight":
        kayak.x += speed;
        break;
      case "ArrowLeft":
        kayak.x -= speed;
        break;
    }
  }
}

// ----------------------//
// ----GAME FUNCTIONS----//
// ----------------------//
drawStuff = () => {
  // draw river
  river.draw(canvas.width, canvas.height);
  //draw wins
  wins.drawWin(wins.coin);
  wins.drawWin(wins.diamond);
  // draw kayak
  kayak.draw();
  // draw pontons
  ponton.drawLeft(canvas.width, river.wather.w);
  ponton.drawRight(canvas.width, river.wather.w);
  // draw ships
  ship.drawShip(ship.right);
  ship.drawShip(ship.left);
  // draw buoys
  buoy.drawBuoys();
};

moveStuff = () => {
  wins.moveWin(wins.coin, 5, canvas.height, stream);
  wins.moveWin(wins.diamond, 10, canvas.height, stream);
  ponton.moveLeft(canvas.height, stream);
  ponton.moveRight(canvas.height, stream);
  ship.moveRightShip(canvas.height, stream);
  ship.moveLeftShip(canvas.height, stream);
  buoy.moveBuoy(canvas.height, stream);
};

gameOver = () => {
  game = false;
  end = true;
  control.innerHTML = control.innerHTML.replace("stop", "restart");
  let gameover = new Image();
  gameover.src = "./img/gameover.png";
  ctx.drawImage(gameover, 0, 0);
};

changeLevel = () => {
  level++;
  stream = stream + 0.5;
  levelBoard.innerHTML = level + 1;
};

changeScore = (value) => {
  score = score + value;
  scoreBoard.innerHTML = score;
  if (Math.floor(score / 10) > level) {
    changeLevel();
  }
};
// ----------------------//
// ------COLLISIONS------//
// ----------------------//
collisions = () => {
  //left shore
  if (kayak.x <= canvas.width / 2 - river.wather.w / 2) {
    kayak.x = kayak.x + speed;
  }
  //right shore
  if (kayak.x + kayak.w >= canvas.width / 2 + river.wather.w / 2) {
    kayak.x = kayak.x - speed;
  }
  //top border
  if (kayak.y <= 0) {
    kayak.y = kayak.y + speed;
  }
  //bottom border
  if (kayak.y + kayak.h >= canvas.height) {
    kayak.y = kayak.y - speed;
  }
  //left ponton
  if (
    kayak.x < ponton.left.x + ponton.w &&
    kayak.y < ponton.left.y + ponton.h &&
    kayak.y > ponton.left.y
  ) {
    gameOver();
  }
  //right ponton
  if (
    kayak.x + kayak.w > ponton.right.x &&
    kayak.y < ponton.right.y + ponton.h &&
    kayak.y > ponton.right.y
  ) {
    gameOver();
  }
  // bouys
  if (
    (buoy.left.x + buoy.left.w >= kayak.x &&
      buoy.left.x - buoy.left.w <= kayak.x + kayak.w &&
      buoy.left.y + buoy.left.w >= kayak.y &&
      buoy.left.y - buoy.left.w <= kayak.y + kayak.h) ||
    (buoy.right.x + buoy.right.w >= kayak.x &&
      buoy.right.x - buoy.right.w <= kayak.x + kayak.w &&
      buoy.right.y + buoy.right.w >= kayak.y &&
      buoy.right.y - buoy.right.w <= kayak.y + kayak.h)
  ) {
    gameOver();
  }
  // left ship
  if (
    kayak.x + kayak.w >= ship.left.x + 5 &&
    kayak.x <= ship.left.x + ship.left.w - 5 &&
    kayak.y + kayak.h > ship.left.y + 10 &&
    kayak.y <= ship.left.y + ship.left.h - 10
  ) {
    gameOver();
  }
  // right ship
  if (
    kayak.x + kayak.w >= ship.right.x + 5 &&
    kayak.x <= ship.right.x + ship.right.w - 5 &&
    kayak.y + kayak.h > ship.right.y + 10 &&
    kayak.y <= ship.right.y + ship.right.h - 10
  ) {
    gameOver();
  }
  // coin
  if (
    kayak.x + kayak.w >= wins.coin.x &&
    kayak.x <= wins.coin.x + wins.coin.w &&
    kayak.y + kayak.h > wins.coin.y &&
    kayak.y <= wins.coin.y + wins.coin.h
  ) {
    wins.changeWinPosition(wins.coin, 5);
    changeScore(1);
  }
  // diamond
  if (
    kayak.x + kayak.w >= wins.diamond.x &&
    kayak.x <= wins.diamond.x + wins.diamond.w &&
    kayak.y + kayak.h > wins.diamond.y &&
    kayak.y <= wins.diamond.y + wins.diamond.h
  ) {
    wins.changeWinPosition(wins.diamond, 10);
    changeScore(3);
  }
};

// ----------------------//
// ------GAME LOOP-------//
// ----------------------//
gameLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStuff();
  //collisions
  collisions();
  if (game === true) {
    moveStuff();
  }
  requestAnimationFrame(gameLoop);
};

gameLoop();
