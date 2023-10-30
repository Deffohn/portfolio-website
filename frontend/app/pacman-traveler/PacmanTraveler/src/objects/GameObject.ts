import { Hitbox } from "../Hitboxs/Hitbox";
import { Direction, Position } from "../mapTypes";
import { Obstacle } from "./Obstacle";

export interface GameObject {
  hitbox: Hitbox;
  move(direction: Direction, speed: number, obstacles: Obstacle[]): void;
  canvasDraw(
    ctx: CanvasRenderingContext2D,
    tileWidthPx: number, tileHeightPx: number,
    deltaPacmanXPx: number, deltaPacmanYPx: number,
  ): void;
}