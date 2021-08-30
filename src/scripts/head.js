function Head(snake) {
  //return a dir
  this.find = (pos, goal) => {
    this.x = pos.x;
    this.y = pos.y;

    this.avaliable = this.checkAvaliableDirs(this);

    if (this.avaliable.length == 0) {
      console.log("no path", this.avaliable);
      return false;
    }

    //pathfinding logic
    let dir = this.getBestDir(goal);

    //check if a path is avaliable in future
    this.move(dir);
    if (this.checkAvaliableDirs(this).length == 0) {
      console.log("death infront");
      const index = this.avaliable.indexOf(dir);
      this.avaliable.splice(index);
      dir = this.avaliable.pop();
    }

    return dir;
  };

  this.checkAvaliableDirs = (a) => {
    let avaliable = [];

    if (!snake.find((cell) => cell.x == a.x - 1 && cell.y == a.y))
      avaliable.push("left");
    if (!snake.find((cell) => cell.x == a.x + 1 && cell.y == a.y))
      avaliable.push("right");
    if (!snake.find((cell) => cell.x == a.x && cell.y == a.y - 1))
      avaliable.push("up");
    if (!snake.find((cell) => cell.x == a.x && cell.y == a.y + 1))
      avaliable.push("down");

    return avaliable;
  };

  this.getBestDir = (goal) => {
    let best = Infinity;
    let bestDir;

    this.avaliable.forEach((dir) => {
      const pos = { ...this };

      switch (dir) {
        case "left":
          pos.x--;
          break;
        case "right":
          pos.x++;
          break;
        case "up":
          pos.y--;
          break;
        case "down":
          pos.y++;
          break;
      }

      const dist = this.distance(goal, pos);
      if (best > dist) {
        bestDir = dir;
        best = dist;
      }
    });

    return bestDir;
  };

  this.move = (dir) => {
    switch (dir) {
      case "left":
        this.x--;
        break;
      case "right":
        this.x++;
        break;
      case "up":
        this.y--;
        break;
      case "down":
        this.y++;
        break;
      default:
        console.log("undefined dir : " + dir);
        break;
    }
  };

  this.distance = (a, b) => {
    // √[(x2 − x1)2 + (y2 − y1)2]
    const dist = Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
    return Math.sqrt(dist);
  };
}
