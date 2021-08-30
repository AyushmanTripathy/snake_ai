const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const gridSize = 50;
const blockSize = canvas.width / gridSize;
const frameRate = 20;

let intervalId;
let state;
let head;

window.onload = init;
function init() {
  state = new State();

  intervalId = setInterval(() => {
    try {
      const endResult = gameLoop(state);

      head = new Head(state.player.body);
      dir = head.find({ ...state.player.head }, state.food);

      // couldn't find a path
      if (!dir) stop();

      if (!endResult) {
        //if game has ended
        console.log("dead");
        stop();
      }

      // change dir
      let vel = state.player.vel;
      switch (dir) {
        case "left":
          (vel.x = -1), (vel.y = 0);
          break;
        case "up":
          (vel.x = 0), (vel.y = -1);
          break;
        case "right":
          (vel.x = 1), (vel.y = 0);
          break;
        case "down":
          (vel.x = 0), (vel.y = 1);
          break;
        default:
          console.log("unknown dir : " + dir);
          break;
      }
      drawGame(state);
    } catch (err) {
      console.error(err);
      stop();
    }
  }, frameRate);
}

function drawGame(state) {
  //reseting the background
  ctx.fillStyle = "#202124";
  ctx.fillRect(0, 0, canvas.height, canvas.width);

  drawSnake(state.player);
  drawFood(state.food);
}

function drawSnake(player) {
  ctx.fillStyle = "green";

  player.body.forEach((cell) => {
    ctx.fillRect(
      cell.x * blockSize,
      cell.y * blockSize,
      blockSize - 3,
      blockSize - 3
    );
  });

  ctx.fillStyle = "red";
  const cell = player.head;
  ctx.fillRect(
    cell.x * blockSize,
    cell.y * blockSize,
    blockSize - 3,
    blockSize - 3
  );
}

function drawFood(cell) {
  ctx.fillStyle = "red";
  ctx.fillRect(cell.x * blockSize, cell.y * blockSize, blockSize, blockSize);
}

function chooseRandom(prob) {
  if (!Math.round(Math.random() * prob)) return 1;
  return 0;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function stop() {
  return clearInterval(intervalId);
}
