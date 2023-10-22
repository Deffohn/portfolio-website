import { Obstacle } from "./objects/Obstacle";
import { Direction, Position } from "./mapTypes";
import { CircleHitbox } from "./Hitboxs/CircleHitbox";
import { GameObject } from "./objects/GameObject";

export class PacmanPlayer implements GameObject {
  hitbox: CircleHitbox;
  score: number;

  pacmanPlayerImage: HTMLImageElement;
  pacmanDrawingPosition: Position;

  constructor(
    x: number, y: number,
    size: number,
    pacmanPlayerImageSrc: string,
    mapChunkWidth: number, mapChunkHeight: number,
  ) {
    this.hitbox = new CircleHitbox(x, y, size / 2);

    this.pacmanPlayerImage = new Image();
    this.pacmanPlayerImage.src = pacmanPlayerImageSrc;

    this.pacmanDrawingPosition = {
      x: mapChunkWidth / 2 - this.hitbox.radius,
      y: mapChunkHeight / 2 - this.hitbox.radius,
    };

    this.score = 0;
  }

  increaseScore(score: number): void {
    this.score += score;
  }

  move(direction: Direction, speed: number, obstacles: Obstacle[]): void {

    // normalize direction vector
    let magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
    if (magnitude !== 0) {
      direction.x /= magnitude;
      direction.y /= magnitude;
    }

    const newPosition: Position = {
      x: this.hitbox.x + direction.x * speed,
      y: this.hitbox.y + direction.y * speed,
    };

    let xDoMove = true;
    let yDoMove = true;
    for (let obstacle of obstacles) {
      if (obstacle.hitbox.isObjectCrossing(new CircleHitbox(newPosition.x, this.hitbox.y, this.hitbox.radius))) {
        xDoMove = false;
      } if (obstacle.hitbox.isObjectCrossing(new CircleHitbox(this.hitbox.x, newPosition.y, this.hitbox.radius))) {
        yDoMove = false;
      }
    }

    if (xDoMove) this.hitbox.x = newPosition.x;
    if (yDoMove) this.hitbox.y = newPosition.y;

  }

  canvasDraw(
    ctx: CanvasRenderingContext2D,
    tileWidthPx: number, tileHeightPx: number,

  ): void {

    let pacmanDrawingPositionPx: Position = this.getPacmanDrawingPositionPx(
      tileWidthPx,
      tileHeightPx,
    );
    ctx.drawImage(
      this.pacmanPlayerImage,

      // position on canvas
      pacmanDrawingPositionPx.x,
      pacmanDrawingPositionPx.y,

      // px size on canvas
      tileWidthPx * 2 * this.hitbox.radius,
      tileHeightPx * 2 * this.hitbox.radius,
    );
  }

  getPacmanDrawingPositionPx(
    tileWidthPx: number,
    tileHeightPx: number,
  ): Position {
    return {
      x: this.pacmanDrawingPosition.x * tileWidthPx,
      y: this.pacmanDrawingPosition.y * tileHeightPx,
    };
  }

  getDeltaPacmanPositionPx(
    tileWidthPx: number,
    tileHeightPx: number,
  ): Position {
    let pacmanDrawingPositionPx: Position = this.getPacmanDrawingPositionPx(tileWidthPx, tileHeightPx);
    return {
      x: this.hitbox.x * tileWidthPx - pacmanDrawingPositionPx.x - (this.hitbox.radius * tileWidthPx),
      y: this.hitbox.y * tileHeightPx - pacmanDrawingPositionPx.y - (this.hitbox.radius * tileHeightPx),
    };
  }

  
}