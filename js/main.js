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
let lives = 3;
let scoreBoard = document.getElementById("score");
let levelBoard = document.getElementById("level");
let livesBoard = document.getElementById("lives");
scoreBoard.innerHTML = score;
levelBoard.innerHTML = level + 1;
livesBoard.innerHTML = lives;
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

const elemLeft = canvas.offsetLeft + canvas.clientLeft,
  elemTop = canvas.offsetTop + canvas.clientTop;

// Add event listener for `click` events.
canvas.addEventListener(
  "click",
  function (event) {
    var x = event.pageX,
      y = event.pageY;
    if (game) {
      //up
      if (
        x > elemLeft + canvas.width / 3 &&
        x < elemLeft + (canvas.width * 2) / 3 &&
        y > elemTop &&
        y < elemTop + canvas.height / 3
      ) {
        kayak.y -= speed * 2;
      }
      //down
      if (
        x > elemLeft + canvas.width / 3 &&
        x < elemLeft + (canvas.width * 2) / 3 &&
        y > elemTop + (canvas.height * 2) / 3 &&
        y < elemTop + canvas.height
      ) {
        kayak.y += speed;
      }
      //left
      if (
        x > elemLeft &&
        x < elemLeft + canvas.width / 2 &&
        y > elemTop + canvas.height / 3 &&
        y < elemTop + (canvas.height * 2) / 3
      ) {
        kayak.x -= speed * 2;
      }
      //right
      if (
        x < elemLeft + canvas.width &&
        x > elemLeft + canvas.width / 2 &&
        y > elemTop + canvas.height / 3 &&
        y < elemTop + (canvas.height * 2) / 3
      ) {
        kayak.x += speed * 2;
      }
      //up - left
      if (
        x > elemLeft &&
        x < elemLeft + canvas.width / 3 &&
        y > elemTop &&
        y < elemTop + canvas.height / 3
      ) {
        kayak.y -= speed * 2;
        kayak.x -= speed * 2;
      }

      //up - right
      if (
        x > elemLeft + (canvas.width * 2) / 3 &&
        x < elemLeft + canvas.width &&
        y > elemTop &&
        y < elemTop + canvas.height / 3
      ) {
        kayak.y -= speed * 2;
        kayak.x += speed * 2;
      }

      //down - right
      if (
        x > elemLeft + (canvas.width * 2) / 3 &&
        x < elemLeft + canvas.width &&
        y > elemTop + (canvas.height * 2) / 3 &&
        y < elemTop + canvas.height
      ) {
        kayak.y += speed * 2;
        kayak.x += speed * 2;
      }
      //down - left
      if (
        x > elemLeft &&
        x < elemLeft + canvas.width / 3 &&
        y > elemTop + (canvas.height * 2) / 3 &&
        y < elemTop + canvas.height
      ) {
        kayak.y += speed * 2;
        kayak.x -= speed * 2;
      }
    }
  },
  false
);
// sound
playSound = (src) => {
  let sound = document.createElement("audio");
  sound.src = src;
  sound.setAttribute("preload", "auto");
  sound.setAttribute("controls", "none");
  sound.style.display = "none";
  document.body.appendChild(sound);
  sound.play();
};

// ----------------------//
// ----GAME FUNCTIONS----//
// ----------------------//

drawStuff = () => {
  // draw river
  river.draw(canvas.width, canvas.height);
  //draw wins
  wins.drawWin(wins.coin);
  wins.drawWin(wins.diamond);
  wins.drawWin(wins.life);
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
  wins.moveWin(wins.diamond, 20, canvas.height, stream);
  wins.moveWin(wins.life, 30, canvas.height, stream);
  ponton.moveLeft(canvas.height, stream);
  ponton.moveRight(canvas.height, stream);
  ship.moveRightShip(canvas.height, stream);
  ship.moveLeftShip(canvas.height, stream);
  buoy.moveBuoy(canvas.height, stream);
};

gameOver = () => {
  let gameover = new Image();
  gameover.src = "./img/gameover.png";
  ctx.drawImage(gameover, 0, 0);
  lives = 0;
  livesBoard.innerHTML = lives;
  if (!end) {
    game = false;
    end = true;
    control.innerHTML = control.innerHTML.replace("stop", "restart");
    playSound("./sounds/end.mp3");
  }
};
changeLives = (life) => {
  if (life) {
    lives += 1;
    livesBoard.innerHTML = lives;
    playSound("./sounds/beep.mp3");
  } else {
    lives -= 1;
    if (lives <= 0) {
      gameOver();
    } else {
      livesBoard.innerHTML = lives;
      kayak.x = 167;
      kayak.y = 200;
      playSound("./sounds/end.mp3");
    }
  }
};

changeLevel = () => {
  level++;
  stream = stream + 0.5;
  levelBoard.innerHTML = level + 1;
};

changeScore = (value) => {
  playSound("./sounds/beep.mp3");
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
    changeLives(false);
  }
  //right ponton
  if (
    kayak.x + kayak.w > ponton.right.x &&
    kayak.y < ponton.right.y + ponton.h &&
    kayak.y > ponton.right.y
  ) {
    changeLives(false);
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
    changeLives(false);
  }
  // left ship
  if (
    kayak.x + kayak.w >= ship.left.x + 5 &&
    kayak.x <= ship.left.x + ship.left.w - 5 &&
    kayak.y + kayak.h > ship.left.y + 10 &&
    kayak.y <= ship.left.y + ship.left.h - 10
  ) {
    changeLives(false);
  }
  // right ship
  if (
    kayak.x + kayak.w >= ship.right.x + 5 &&
    kayak.x <= ship.right.x + ship.right.w - 5 &&
    kayak.y + kayak.h > ship.right.y + 10 &&
    kayak.y <= ship.right.y + ship.right.h - 10
  ) {
    changeLives(false);
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
    wins.changeWinPosition(wins.diamond, 15);
    changeScore(3);
  }
  // diamond
  if (
    kayak.x + kayak.w >= wins.life.x &&
    kayak.x <= wins.life.x + wins.life.w &&
    kayak.y + kayak.h > wins.life.y &&
    kayak.y <= wins.life.y + wins.life.h
  ) {
    wins.changeWinPosition(wins.life, 30);
    checkLifePosition();
    changeLives(true);
  }
};

// ----------------------//
// ------GAME LOOP-------//
// ----------------------//
gameLoop = () => {
  drawStuff();
  if (game) {
    moveStuff();
  }
  collisions();
  requestAnimationFrame(gameLoop);
};

gameLoop();
