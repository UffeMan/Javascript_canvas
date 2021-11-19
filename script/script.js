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
let context;

// testing
let radius = 50;
let radiusCounter = 0.0;

// Sprites
const sprite = {
  posX: 0,
  posY: 0,
  speedX: 0,
  speedY: 0,
  size: 1,
  img: "./media/img/testsprite.png",
};

window.onload = init;

function init() {
  canvas = document.getElementById("my-canvas");
  context = canvas.getContext("2d");
  context.font = "30px Courier New";
  window.requestAnimationFrame(gameLoop);
}

function gameLoop() {
  let ts = performance.now();
  updateSound();
  readInput();
  updateFrame();
  draw();
  context.fillStyle = "#808080";
  context.fillText(
    "SCORE:0000000000       " + (performance.now() - ts),
    20,
    30
  );
  window.requestAnimationFrame(gameLoop);
}

function updateSound() {}

function readInput() {}

function updateFrame() {
  radius = (Math.sin(2 * Math.PI * radiusCounter) + 1) * 100 + 50;
  radiusCounter += 0.01;
  if (radiusCounter > 1) radiusCounter = 0;
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  let randomColor = Math.random() > 0.5 ? "#ffffff" : "#000000";
  let randomRadius = Math.random() * 50 + 100;
  context.fillStyle = randomColor;
  //context.fillRect(100, 50, 150, 500);

  // test cirkel
  context.beginPath();
  context.lineWidth = 3;
  context.strokeStyle = "#ffff80";
  context.arc(400, 300, radius + 1, 0, Math.PI * 2, true);
  context.fillStyle = "#901111";
  context.fill();
  context.stroke();

  //test linje
  context.beginPath();
  context.lineWidth = 1;
  context.strokeStyle = "#ffff00";
  context.moveTo(40, 40);
  context.lineTo(300, 150);
  context.stroke();
}
