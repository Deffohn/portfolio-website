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

    const newPosition: Position = (() : Position => {
      switch (direction) {
        case Direction.Up:
          return { x: this.x, y: this.y - speed };
        case Direction.Down:
          return { x: this.x, y: this.y + speed };
        case Direction.Left:
          return { x: this.x - speed, y: this.y };
        case Direction.Right:
          return { x: this.x + speed, y: this.y };
      }
    })();

    for (let obstacle of obstacles) {
      if (obstacle.isPacmanInside(newPosition.x, newPosition.y, this.size)) {
        return;
      }
    }

    this.x = newPosition.x;
    this.y = newPosition.y;
  }

  // drawn Pacman here canvasDraw();
  
}