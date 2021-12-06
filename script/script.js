"use strict";
let canvas;
let ctx;

let pic;

let gameLevel = 0;
let gameZpos = 0;
let gameState = 0;
let directionInput = 0;
let playerAngle = 0;
let speedX = 0;
let speedY = 0;
let screenPosX = [0, 60, 120, 180];
let screenPosY = [0, 60, 120, 180];
let oldScreenPosX = 0;
let oldScreenPosY = 0;
let topLevelX;
let topLevelY;

let tileWidth = 64;
let tileHeight = 64;
let levelWidth = 25;
let levelHeight = 19;
let levelDepth = 4;

let framerate = 60;
let averageFramerate;
let sumFramerate = 0;
let fCounter = 0;
let oldPerformance;
let newPerformance;

let bulletDirection = 0;
let bulletSpeed = 4;

const activeBullet = [];
// testing
let radius = 50;
let radiusCounter = 0.0;

const sprite = {
  posX: 0,
  posY: 0,
  posZ: 0,
  speedX: 0,
  speedY: 0,
  size: 0,
  angle: 0,
  img: "",
};
document.addEventListener("keydown", function (event) {
  if (event.code == "ArrowUp") {
    directionInput = directionInput | 1;
  } else if (event.code == "ArrowLeft") {
    directionInput = directionInput | 2;
  } else if (event.code == "ArrowDown") {
    directionInput = directionInput | 4;
  } else if (event.code == "ArrowRight") {
    directionInput = directionInput | 8;
  } else if (event.code == "ControlRight" || event.code == "AltRight") {
    // beräkna riktning på skotten
    bulletDirection = Math.atan2(speedY, speedX);
    activeBullet.push(Object.assign({}, sprite));
    activeBullet[activeBullet.length - 1].posX = 400 - 32;
    activeBullet[activeBullet.length - 1].posY = 300 - 32;
    activeBullet[activeBullet.length - 1].img = "";
    activeBullet[activeBullet.length - 1].speedX =
      bulletSpeed * Math.cos(bulletDirection);
    activeBullet[activeBullet.length - 1].speedY =
      bulletSpeed * Math.sin(bulletDirection);
    pic = new Image();
    pic.src = "./media/img/sprite-bullet.png";
    activeBullet[activeBullet.length - 1].img = pic;
  }
});

document.addEventListener("keyup", function (event) {
  if (event.code == "ArrowUp") {
    directionInput = directionInput ^ (1 & 15);
  } else if (event.code == "ArrowLeft") {
    directionInput = directionInput ^ (2 & 15);
  } else if (event.code == "ArrowDown") {
    directionInput = directionInput ^ (4 & 15);
  } else if (event.code == "ArrowRight") {
    directionInput = directionInput ^ (8 & 15);
  } else if (event.code == "ControlRight" || event.code == "AltRight") {
    // beräkna riktning på skotten
    bulletDirection = Math.atan2(speedY, speedX);
    activeBullet.push(Object.assign({}, sprite));
    activeBullet[activeBullet.length - 1].posX = 400 - 32;
    activeBullet[activeBullet.length - 1].posY = 300 - 32;
    activeBullet[activeBullet.length - 1].img = "";
    activeBullet[activeBullet.length - 1].speedX =
      bulletSpeed * Math.cos(bulletDirection);
    activeBullet[activeBullet.length - 1].speedY =
      bulletSpeed * Math.sin(bulletDirection);
    pic = new Image();
    pic.src = "./media/img/sprite-bullet.png";
    activeBullet[activeBullet.length - 1].img = pic;
  }
});

document.addEventListener("mousemove", function (event) {
  playerAngle = (playerAngle + event.movementX * 0.667) % 360;
  ///console.log(playerAngle + " mouse angle");
});

// En bunt av Sprites.

const sprites = [];
for (let i = 0; i < 1; i++) sprites.push(Object.assign({}, sprite));
pic = new Image();
pic.src = "./media/img/player-sprite1.png";
sprites[0].img = pic;

// En bunt av Tiles
const tile = {
  alpha: 0.0,
  img: null,
};

const tiles = [];
for (let i = 0; i < 9; i++) tiles.push(Object.assign({}, tile)); // pushar in samma tile....    inte bra alls....    fixat!

pic = new Image();
pic.src = "./media/img/tile-floor-left.png";
tiles[0].alpha = 1;
tiles[0].img = pic;
pic = new Image();
pic.src = "./media/img/tile-floor-right.png";
tiles[1].alpha = 1;
tiles[1].img = pic;
pic = new Image();
pic.src = "./media/img/tile-floor-cross.png";
tiles[2].alpha = 1;
tiles[2].img = pic;
pic = new Image();
pic.src = "./media/img/floor-glas-tile.png";
tiles[3].alpha = 0.1;
tiles[3].img = pic;
pic = new Image();
pic.src = "./media/img/floor-glas-tile.png";
tiles[4].alpha = 1;
tiles[4].img = pic;
pic = new Image();
pic.src = "./media/img/tile-floor-cross.png";
tiles[5].alpha = 1;
tiles[5].img = pic;
pic = new Image();
pic.src = "./media/img/tile-floor-cross.png";
tiles[6].alpha = 1;
tiles[6].img = pic;
pic = new Image();
pic.src = "./media/img/tile-floor-cross.png";
tiles[7].alpha = 1;
tiles[7].img = pic;
pic = new Image();
pic.src = "./media/img/wall-tile.png";
tiles[8].alpha = 1;
tiles[8].img = pic;
// En bunt Levels med scroll. Dax att göra "Hell Well"
let lname1 = [
  "Nice ",
  "Bad ",
  "Brutal ",
  "Ugly ",
  "Shiny ",
  "Rotten ",
  "Superior ",
  "Dull ",
];
let lname2 = [
  "car",
  "banana",
  "phone",
  "poodle",
  "spine",
  "cult",
  "smurf",
  "star",
];
const level = {
  levelName: "",

  design: [
    [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ],
    [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ],
    [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ],
    [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ],
  ],
};
createLevel();

const levels = [];
for (let i = 0; i < 1; i++) levels.push(Object.assign({}, level));

window.onload = init;

function init() {
  canvas = document.getElementById("my-canvas");
  ctx = canvas.getContext("2d");
  ctx.font = "30px Courier New";
  window.requestAnimationFrame(gameLoop);
}

/******************************************
*******************************************
              Maine function
*******************************************
*******************************************/

function gameLoop() {
  let ts = performance.now();
  oldPerformance = newPerformance;
  newPerformance = ts;
  framerate = 1000 / (newPerformance - oldPerformance);
  sumFramerate = sumFramerate + framerate;
  fCounter++;
  if (fCounter >= 20) {
    averageFramerate = Math.floor(sumFramerate / fCounter);
    fCounter = 0;
    sumFramerate = 0;
  }
  updateSound();
  readInput();
  updateFrame();
  draw();

  ctx.clearRect(0, 0, canvas.width, 42);
  ctx.shadowBlur = 5;
  ctx.shadowColor = "red";
  ctx.fillStyle = "#80f080f0";
  ctx.fill();
  ctx.fillText(
    "SCORE:0000000000 " + averageFramerate + " Hz  " + level.levelName, //+ (performance.now() - ts
    20,
    30
  );
  ctx.shadowBlur = 0;
  window.requestAnimationFrame(gameLoop);
}

/******************************************
              Sound function
*******************************************/

function updateSound() {}

/******************************************
              Read function
*******************************************/

function readInput() {}

/******************************************
              Update function
*******************************************/

function updateFrame() {
  //parallax

  if (speedX < 0) speedX = speedX + 0.25;
  if (speedX > 0) speedX = speedX - 0.25;
  if (speedY < 0) speedY = speedY + 0.25;
  if (speedY > 0) speedY = speedY - 0.25;

  if ((directionInput & 1) == 1) {
    speedY = speedY - 1;
    if (speedY < -5) speedY = -5;
  }
  if ((directionInput & 2) == 2) {
    speedX = speedX - 1;
    if (speedX < -5) speedX = -5;
  }
  if ((directionInput & 4) == 4) {
    speedY = speedY + 1;
    if (speedY > 5) speedY = 5;
  }
  if ((directionInput & 8) == 8) {
    speedX = speedX + 1;
    if (speedX > 5) speedX = 5;
  }

  // Move and remove bullets
  for (let i = 0; i < activeBullet.length; i++) {
    if (
      activeBullet[i].posX < 0 ||
      activeBullet[i].posX > canvas.width ||
      activeBullet[i].posY < 0 ||
      activeBullet[i].posY > canvas.height
    ) {
      activeBullet.splice(i, 1);
    } else {
      activeBullet[i].posX +=
        activeBullet[i].speedX - (screenPosX[gameLevel] - oldScreenPosX);
      activeBullet[i].posY +=
        activeBullet[i].speedY - (screenPosY[gameLevel] - oldScreenPosY);
    }
  }

  let parallaxSpeed = 1.0;
  let framerateCompensation = 1;
  if (framerate) framerateCompensation = 60.0 / framerate;

  oldScreenPosX = screenPosX[gameLevel];
  oldScreenPosY = screenPosY[gameLevel];

  for (let i = gameZpos; i < levels[gameLevel].design.length; i++) {
    screenPosX[i] += speedX * parallaxSpeed * framerateCompensation;
    screenPosY[i] += speedY * parallaxSpeed * framerateCompensation;
    parallaxSpeed = parallaxSpeed - 0.1;
  }

  // Svart runt leveln
  levelWidth = levels[gameLevel].design[0][0].length * tileWidth;
  levelHeight = levels[gameLevel].design[0].length * tileHeight;
  topLevelX = -screenPosX[gameZpos];
  topLevelY = -screenPosY[gameZpos];
}

/******************************************
              Draw function
*******************************************/

function draw() {
  //Draw Level

  for (let k = levels[gameLevel].design.length - 1; k >= gameZpos; --k) {
    for (let j = 0; j < levels[gameLevel].design[k].length; j++) {
      for (let i = 0; i < levels[gameLevel].design[k][j].length; i++) {
        ctx.globalAlpha = tiles[levels[gameLevel].design[k][j][i]].alpha;
        ctx.drawImage(
          tiles[levels[gameLevel].design[k][j][i]].img,
          i * pic.naturalWidth - screenPosX[k],
          j * pic.naturalHeight - screenPosY[k]
        );
      }
    }
  }

  // draw sprites
  ctx.globalAlpha = 1;
  ctx.shadowColor = "orange";
  ctx.shadowBlur = 10;

  for (let i = 0; i < activeBullet.length; i++) {
    if (activeBullet[i]) {
      ctx.drawImage(
        activeBullet[i].img,
        activeBullet[i].posX,
        activeBullet[i].posY
      );
    }
  }
  ctx.shadowColor = "red";
  ctx.drawImage(sprites[0].img, sprites[0].posX + 368, sprites[0].posY + 268);

  // Draw 4 black boxes to the outer edges of the level
  if (canvas.width - topLevelX >= 0) {
    ctx.clearRect(0, 0, canvas.width, topLevelY);
  }
  if (canvas.height - topLevelY >= 0) {
    ctx.clearRect(0, topLevelY, topLevelX, -topLevelY + canvas.height);
  }

  if (canvas.height - (levelHeight + topLevelY) >= 0) {
    ctx.clearRect(
      0,
      levelHeight + topLevelY,
      canvas.width,
      canvas.height - (levelHeight + topLevelY)
    );
  }

  if (levelHeight + topLevelY >= 0 && -(canvas.width + topLevelX) >= 0) {
    ctx.clearRect(
      levelWidth + topLevelX,
      0,
      -(canvas.width + topLevelX),
      levelHeight + topLevelY
    );
  }
}

//tiles[levels[gameLevel].design[k][j][i]];
function createLevel() {
  level.levelName =
    lname1[Math.floor(Math.random() * 8)] +
    lname2[Math.floor(Math.random() * 8)];

  // Nice floor
  let floor = [0, 1, 0, 1, 0, 1, 0, 1, 2];
  for (let k = levelDepth - 1; k >= 0; --k) {
    for (let j = 0; j < levelHeight; j++) {
      for (let i = 0; i < levelWidth; i++) {
        level.design[k][j][i] = floor[Math.floor(Math.random() * floor.length)];
      }
    }
  }

  // Add some glass floor and wall tiles (kan bli mycket bättre)
  for (let k = levelDepth - 1; k >= 0; --k) {
    for (let j = 0; j < levelHeight; j++) {
      for (let i = 0; i < levelWidth; i++) {
        if (k < levelDepth - 1) {
          if (Math.random() < 0.1) level.design[k][j][i] = 3;
        }
        if (Math.random() < 0.02) level.design[k][j][i] = 8;
      }
    }
  }

  // Add a wall
  for (let k = levelDepth - 1; k >= 0; --k) {
    for (let j = 0; j < levelHeight; j++) {
      for (let i = 0; i < levelWidth; i++) {
        if (i == 0 || i == levelWidth - 1 || j == 0 || j == levelHeight - 1) {
          level.design[k][j][i] = 8;
        }
      }
    }
  }
}
