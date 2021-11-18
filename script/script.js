"use strict";
let canvas;
let context;

window.onload = init;

function init() {
  canvas = document.getElementById("my-canvas");
  context = canvas.getContext("2d");
  context.font = "30px Arial";
  window.requestAnimationFrame(gameLoop);
}

function gameLoop() {
  let ts = Date.now();
  readInput();
  updateFrame();
  draw();
  context.fillStyle = "#808080";
  context.fillText(Date.now() - ts + " ms", 20, 30);
  window.requestAnimationFrame(gameLoop);
}

function readInput() {}

function updateFrame() {}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  let randomColor = Math.random() > 0.5 ? "#ff8080" : "#0099b0";

  context.fillStyle = randomColor;
  context.fillRect(100, 50, 200, 175);

  context.beginPath();
  context.lineWidth = 1;
  context.strokeStyle = "#ffffff";
  context.arc(400, 300, 100, 0, Math.PI * 2, true);
  context.stroke();
  //for(let i = 0; i < 500000000; i++) { i++; --i; }
}
