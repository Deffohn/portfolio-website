import { Obstacle } from "./Obstacle";
import { Direction, Position } from "./mapTypes";

export class PacmanPlayer implements Position {
  x: number;
  y: number;
  size: number;
  score: number;

  pacmanPlayerImage: HTMLImageElement;
  pacmanDrawingPosition: Position;

  constructor(x: number, y: number, size: number, pacmanPlayerImageSrc: string, mapChunkSize: number) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.pacmanPlayerImage = new Image();
    this.pacmanPlayerImage.src = pacmanPlayerImageSrc;

    this.pacmanDrawingPosition = {
      x: mapChunkSize / 2 - this.size / 2,
      y: mapChunkSize / 2 - this.size / 2,
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
      x: this.x + direction.x * speed,
      y: this.y + direction.y * speed,
    };

    let xDoMove = true;
    let yDoMove = true;
    for (let obstacle of obstacles) {
      if (obstacle.isPacmanInside(newPosition.x, this.y, this.size)) {
        xDoMove = false;
      } if (obstacle.isPacmanInside(this.x, newPosition.y, this.size)) {
        yDoMove = false;
      }
    }

    if (xDoMove) this.x = newPosition.x;
    if (yDoMove) this.y = newPosition.y;

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
      this.size * tileWidthPx,
      this.size * tileHeightPx,
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
      x: this.x * tileWidthPx - pacmanDrawingPositionPx.x - (this.size * tileWidthPx) / 2,
      y: this.y * tileHeightPx - pacmanDrawingPositionPx.y - (this.size * tileHeightPx) / 2,
    };
  }

  
}