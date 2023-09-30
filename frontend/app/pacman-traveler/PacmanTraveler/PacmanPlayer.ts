import { Obstacle } from "./Obstacle";
import { Direction, Position } from "./mapTypes";

export class PacmanPlayer implements Position {
  x: number;
  y: number;
  size: number;

  constructor(x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  move(direction: Direction, speed: number, obstacles: Obstacle[]) {

    // normalize direction vector
    let magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
    if (magnitude !== 0) {
      direction.x /= magnitude;
      direction.y /= magnitude;
    }

    console.log(direction);

    const newPosition: Position = {
      x: this.x + direction.x * speed,
      y: this.y + direction.y * speed,
    };

    for (let obstacle of obstacles) {
      if (obstacle.isPacmanInside(newPosition.x, newPosition.y, this.size)) {
        return;
      }
    }

    this.x = newPosition.x;
    this.y = newPosition.y;
  }

  // draw Pacman here canvasDraw();
  
}