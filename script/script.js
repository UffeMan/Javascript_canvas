/* C64 color codes
$RGBCOLOR0=000000
$RGBCOLOR1=ffffff
$RGBCOLOR2=882000
$RGBCOLOR3=68d0a8
$RGBCOLOR4=a838a0
$RGBCOLOR5=50b818
$RGBCOLOR6=181090
$RGBCOLOR7=f0e858
$RGBCOLOR8=a04800
$RGBCOLOR9=472b1b
$RGBCOLOR10=c87870
$RGBCOLOR11=484848
$RGBCOLOR12=808080
$RGBCOLOR13=98ff98
$RGBCOLOR14=5090d0
$RGBCOLOR15=b8b8b8

alternativt... (antagligen bättre)

00 00 00
FF FF FF
68 37 2B
70 A4 B2
6F 3D 86
58 8D 43
35 28 79
B8 C7 6F
6F 4F 25
43 39 00
9A 67 59
44 44 44
6C 6C 6C
9A D2 84
6C 5E B5
95 95 95


//default (VICE I think)
   {
      RGB2REF(0x000000),
      RGB2REF(0xffffff),
      RGB2REF(0x894036),
      RGB2REF(0x7abfc7),
      RGB2REF(0x8a46ae),
      RGB2REF(0x68a941),
      RGB2REF(0x3e31a2),
      RGB2REF(0xd0dc71),
      RGB2REF(0x905f25),
      RGB2REF(0x5c4700),
      RGB2REF(0xbb776d),
      RGB2REF(0x555555),
      RGB2REF(0x808080),
      RGB2REF(0xacea88),
      RGB2REF(0x7c70da),
      RGB2REF(0xababab)
   },
   //Pepto
   {
      RGB2REF(0x000000),
      RGB2REF(0xFFFFFF),
      RGB2REF(0x68372B),
      RGB2REF(0x70A4B2),
      RGB2REF(0x6F3D86),
      RGB2REF(0x588D43),
      RGB2REF(0x352879),
      RGB2REF(0xB8C76F),
      RGB2REF(0x6F4F25),
      RGB2REF(0x433900),
      RGB2REF(0x9A6759),
      RGB2REF(0x444444),
      RGB2REF(0x6C6C6C),
      RGB2REF(0x9AD284),
      RGB2REF(0x6C5EB5),
      RGB2REF(0x959595)
   },
   //colodore
   {
      RGB2REF(0x000000),
      RGB2REF(0xffffff),
      RGB2REF(0x813338),
      RGB2REF(0x75cec8),
      RGB2REF(0x8e3c97),
      RGB2REF(0x56ac4d),
      RGB2REF(0x2e2c9b),
      RGB2REF(0xedf171),
      RGB2REF(0x8e5029),
      RGB2REF(0x553800),
      RGB2REF(0xc46c71),
      RGB2REF(0x4a4a4a),
      RGB2REF(0x7b7b7b),
      RGB2REF(0xa9ff9f),
      RGB2REF(0x706deb),
      RGB2REF(0xb2b2b2),
   },
   //PALette
   {
      RGB2REF(0x000000),
      RGB2REF(0xd5d5d5),
      RGB2REF(0x72352c),
      RGB2REF(0x659fa6),
      RGB2REF(0x733a91),
      RGB2REF(0x568d35),
      RGB2REF(0x2e237d),
      RGB2REF(0xaeb75e),
      RGB2REF(0x774f1e),
      RGB2REF(0x4b3c00),
      RGB2REF(0x9c635a),
      RGB2REF(0x474747),
      RGB2REF(0x6b6b6b),
      RGB2REF(0x8fc271),
      RGB2REF(0x675db6),
      RGB2REF(0x8f8f8f),
   },
 */

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

let screen0PosX = [0, 64, 128, 192];
let screen0PosY = [0, 64 ,128 ,192];
let screenPosX = [0, 0, 0, 0];
let screenPosY = [0, 0 ,0 ,0];
let tileSizeX = 64;
let tileSizeY = 64;

// testing
let radius = 50;
let radiusCounter = 0.0;

document.addEventListener("keydown", function (event) {
  if (event.code == "ArrowUp") {
    directionInput = directionInput | 1;
  } else if (event.code == "ArrowLeft") {
    directionInput = directionInput | 2;
  } else if (event.code == "ArrowDown") {
    directionInput = directionInput | 4;
  } else if (event.code == "ArrowRight") {
    directionInput = directionInput | 8;
  }
});

document.addEventListener("keyup", function (event) {
  if (event.code == "ArrowUp") {
    directionInput = directionInput & !1 & 15;
  } else if (event.code == "ArrowLeft") {
    directionInput = directionInput & !2 & 15;
  } else if (event.code == "ArrowDown") {
    directionInput = directionInput & !4 & 15;
  } else if (event.code == "ArrowRight") {
    directionInput = directionInput & !8 & 15;
  }
});

document.addEventListener("mousemove", function (event) {
  playerAngle = (playerAngle + event.movementX * 0.667) % 360;
  ///console.log(playerAngle + " mouse angle");
});



// En bunt av Sprites.
const sprite = {
  posX: 0,
  posY: 0,
  posZ: 0,
  speedX: 0,
  speedY: 0,
  size: 1,
  angle: 0,
  img: ""
};
const sprites = [];
for (let i = 0; i < 2; i++) sprites.push(Object.assign({}, sprite));
pic = new Image();
pic.src = "./media/img/player-sprite1.png";
sprites[0].posX = 50;
sprites[0].img = pic;

 // En bunt av Tiles
const tile = {
  alpha: 0.0,
  img: null,
};

const tiles = [];
for (let i = 0; i < 3; i++) tiles.push(Object.assign({}, tile)); // pushar in samma tile....    inte bra alls....    fixat!

pic = new Image();
pic.src = "./media/img/floor-tile.png";
tiles[0].alpha = 1.0;
tiles[0].img = pic;
pic = new Image();
pic.src = "./media/img/wall-tile.bmp";
tiles[1].alpha = 1.0;
tiles[1].img = pic;
pic = new Image();
pic.src = "./media/img/wall-tile.png";
tiles[2].alpha = 1.0;
tiles[2].img = pic;

// En bunt Levels med scroll. Dax att göra "Hell Well"
const level = {
  levelName: "Soft start",

design: [
  [
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]
],
};
const levels = [];
for (let i = 0; i < 1; i++) levels.push(Object.assign({}, level));

window.onload = init;

function init() {
  canvas = document.getElementById("my-canvas");
  ctx = canvas.getContext("2d");
  ctx.font = "30px Courier New";
  window.requestAnimationFrame(gameLoop);
}

function gameLoop() {
  let ts = performance.now();
  updateSound();
  readInput();
  updateFrame();
  draw();
  ctx.clearRect(0, 0, canvas.width, 40);
  ctx.fillStyle = "#c0c0c0";
  ctx.fillText("SCORE:0000000000       " + (performance.now() - ts), 20, 30);
  window.requestAnimationFrame(gameLoop);
}

/******************************************
              Sound function
*******************************************/

function updateSound() {}

/******************************************
              Read function
*******************************************/

function readInput() {
  


}

/******************************************
              Update function
*******************************************/

function updateFrame() {
  //parallax
  canvas.width; //800
  canvas.height; //600
  let totalLevelSizeX =
    levels[gameLevel].design[0][0].length * tileSizeX - canvas.width;
  let totalLevelSizeY =
    levels[gameLevel].design[0].length * tileSizeY - canvas.height;
  

  if (speedX < 0) speedX = speedX + 0.25;
  if (speedX > 0) speedX = speedX - 0.25;
  if (speedY < 0) speedY = speedY + 0.25;
  if (speedY > 0) speedY = speedY - 0.25;

  if ((directionInput & 1) == 1 ) {
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
  if ((directionInput & 8) == 8 ) {
    speedX = speedX + 1;
    if (speedX > 5) speedX = 5;
  }

  screenPosX[gameZpos] +=  speedX;
  screenPosY[gameZpos] +=  speedY;
}

/******************************************
              Draw function
*******************************************/

function draw() {
  //Draw Level

  for (let k = levels[gameLevel].design.length - 1; k >= 0; --k) {
    for (let j = 0; j < levels[gameLevel].design[k].length; j++) {
      for (let i = 0; i < levels[gameLevel].design[k][j].length; i++) {
        ctx.globalAlpha = tiles[levels[gameLevel].design[k][j][i]].alpha;
        ctx.drawImage(
          tiles[levels[gameLevel].design[k][j][i]].img,
          i * pic.naturalWidth - pic.naturalWidth - screenPosX[k],
          j * pic.naturalHeight - pic.naturalHeight - screenPosY[k]
        );
      }
    }
  }

  // draw sprites
  ctx.globalAlpha = 1;
  ctx.drawImage(sprites[0].img, sprites[0].posX + 367, sprites[0].posY + 267);
}
