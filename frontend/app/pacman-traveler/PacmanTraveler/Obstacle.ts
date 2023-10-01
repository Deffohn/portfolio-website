export interface Obstacle {
  isPacmanInside(x: number, y: number, pacmanSize: number): boolean;
  canvasDraw(
    ctx: CanvasRenderingContext2D,
    tileWidthPx: number, tileHeightPx: number,
    deltaPacmanXPx: number, deltaPacmanYPx: number,
  ): void;
}

export class RectangleObstacle implements Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  isPacmanInside(x: number, y: number, pacmanSize: number): boolean {
    return (
      x + pacmanSize / 2 > this.x &&
      x - pacmanSize / 2 < this.x + this.width &&
      y + pacmanSize / 2 > this.y &&
      y - pacmanSize / 2 < this.y + this.height
    );
  }

  canvasDraw(
    ctx: CanvasRenderingContext2D,
    tileWidthPx: number, tileHeightPx: number,
    deltaPacmanXPx: number, deltaPacmanYPx: number,
  ) {

    ctx.fillStyle = "yellow";
    ctx.fillRect(
      this.x * tileWidthPx - deltaPacmanXPx, this.y * tileHeightPx - deltaPacmanYPx,
      this.width * tileWidthPx, this.height * tileHeightPx,
    );

  }
}