

/****************************Footer***************************/

let directionX = 0;
let directionY = 0;
let direction = 0;
let canvas;
let ctx;
let footerStarField;
let star;

document.addEventListener("mousemove", function (event) {
  directionX = direction + event.movementX * 0.1;
  directionY = direction + event.movementY * 0.1;
});
window.onload = init; //Anton... om du har problem med window.onload så beror kan det på att vi har två

function init() {
  canvas = document.getElementById("footer-canvas");
  ctx = canvas.getContext("2d");
  ctx.font = "30px Courier New";

  footerStarField = [];

  star = {
    posX: 0,
    posY: 0,
    speedX: 0,
    speedY: 0,
  };

  for (let i = 0; i < 2048; i++) {
    star.posX = Math.random() * canvas.width;
    star.posY = Math.random() * canvas.height;
    star.speedX = Math.random() * 0.2 + 0.1;
    star.speedY = Math.random() * 0.5 + 0.1;
    footerStarField.push(Object.assign({}, star));
  }

  window.requestAnimationFrame(animationLoop);
}

function animationLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#505050";

  //flytta alla stjärnor åt vänster och mer neråt pga jul.
  for (let i = 0; i < footerStarField.length; i++) {
    footerStarField[i].posX -= footerStarField[i].speedX - directionX;
    footerStarField[i].posY += footerStarField[i].speedY + directionY;
    if (footerStarField[i].posX < 0) {
      footerStarField[i].posX = canvas.width;
      footerStarField[i].speedX = Math.random() * 0.2 + 0.1;
    }
    if (footerStarField[i].posY > canvas.height) {
      footerStarField[i].posY = 0;
      footerStarField[i].speedY = Math.random() * 0.5 + 0.1;
    }
    if (footerStarField[i].posX > canvas.width) {
        footerStarField[i].posX = 0;
        footerStarField[i].speedX = Math.random() * 0.2 + 0.1;
      }
      if (footerStarField[i].posY < 0) {
        footerStarField[i].posY = canvas.height;
        footerStarField[i].speedY = Math.random() * 0.5 + 0.1;
      }
  }

  // rita ut alla stjäror
  for (let i = 0; i < footerStarField.length; i++) {
    let starSize = 2;
    if (footerStarField[i].speedX + footerStarField[i].speedY > 0.25) {
      starSize = 3;
    }
    if (footerStarField[i].speedX + footerStarField[i].speedY > 0.4) {
      starSize = 4;
    }
    if (footerStarField[i].speedX + footerStarField[i].speedY > 0.5) {
      starSize = 5;
    }
    ctx.fillRect(
      footerStarField[i].posX,
      footerStarField[i].posY,
      starSize,
      starSize
    );
  }
  window.requestAnimationFrame(animationLoop);
}
