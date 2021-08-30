function State() {
  this.player = {
    vel: { x: 1, y: 0 },
    head: { x: 5, y: 5 },
    body: [
      { x: 0, y: 5 },
      { x: 1, y: 5 },
      { x: 2, y: 5 },
      { x: 3, y: 5 },
      { x: 4, y: 5 },
      { x: 5, y: 5 },
    ],
  };
  this.food = { x: 10, y: 10 };
}

function gameLoop(state) {
  if (!state) return;

  player = state.player;

  //update head
  player.head.x += player.vel.x;
  player.head.y += player.vel.y;

  //checking for collision with walls
  if (player.head.x < 0 || player.head.y < 0) return false;
  if (player.head.x >= gridSize || player.head.y >= gridSize) return false;

  //check deadth
  player.body.forEach((cell) => {
    if (isEqual(cell, cell)) return false;
  });

  //check for food
  if (isEqual(player.head, state.food)) {
    //make a new cell
    player.body.push({ ...player.head });

    //random food
    state.food = generateFood(player.body);
  }

  //moving the snake forward
  player.body.push({ ...player.head });
  player.body.shift();

  return true;
}

function generateFood(snake) {
  let food = {};
  food.x = Math.floor(Math.random() * gridSize);
  food.y = Math.floor(Math.random() * gridSize);
  snake.forEach((cell) => {
    if (isEqual(cell, food)) return generateFood(snake);
  });

  return food;
}

function isEqual(a, b) {
  if (a.x == b.x && a.y == b.y) return true;
  return false;
}
