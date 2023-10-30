import { Hitbox } from "../Hitboxs/Hitbox";
import { RectangleHitbox } from "../Hitboxs/RectangleHitbox";
import { Direction, Position } from "../mapTypes";
import { Obstacle } from "./Obstacle";

export class RectangleTileBorder implements Obstacle {
  hitbox: RectangleHitbox;

  constructor(x: number, y: number, width: number, height: number) {
    this.hitbox = new RectangleHitbox(x, y, width, height);
  }

  move(_direction: Direction, _speed: number, _obstacles: Obstacle[]): void {
    return;
  }

  canvasDraw(
    ctx: CanvasRenderingContext2D,
    tileWidthPx: number, tileHeightPx: number,
    deltaPacmanXPx: number, deltaPacmanYPx: number,
  ) {

    ctx.fillStyle = "yellow";
    ctx.fillRect(
      this.hitbox.x * tileWidthPx - deltaPacmanXPx, this.hitbox.y * tileHeightPx - deltaPacmanYPx,
      this.hitbox.width * tileWidthPx, this.hitbox.height * tileHeightPx
    );

  }
}
