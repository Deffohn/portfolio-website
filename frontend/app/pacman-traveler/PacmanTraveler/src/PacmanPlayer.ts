import { Obstacle } from "./objects/Obstacle";
import { Direction, Position } from "./mapTypes";
import { CircleHitbox } from "./Hitboxs/CircleHitbox";
import { DrawableObject } from "./objects/DrawableObject";

export class PacmanPlayer extends DrawableObject<CircleHitbox> {
  score: number;

  pacmanDrawingPosition: Position;

  constructor(
    x: number, y: number,
    size: number,
    pacmanPlayerImageSrc: string,
    mapChunkWidth: number, mapChunkHeight: number,
  ) {

    let pacmanPlayerImage = new Image();
    pacmanPlayerImage.src = pacmanPlayerImageSrc;

    super(
      new CircleHitbox(x, y, size / 2),
      {
        image: pacmanPlayerImage,
        pxWidth: 128,
        pxHeight: 128,
        imageSizeX: size / 2,
        imageSizeY: size / 2,
        animationSettings: {
          state: 0,
          totalFrames: 4,
          animationDirection: 1,
        },
        orientationSettings: {
          state: 0,
          totalCycleAngle: 360,
          periodAngle: 90,
        },
      },
    );

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

    super.move(direction, speed, obstacles);

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

    this.refreshAnimationState();

    ctx.drawImage(
      this.orientedSpriteImageSettings.image,

      // position in image
      //
        this.orientedSpriteImageSettings.animationSettings.state
      * this.orientedSpriteImageSettings.pxWidth,
      //
      Math.floor(
        this.orientedSpriteImageSettings.orientationSettings.state
      / this.orientedSpriteImageSettings.orientationSettings.periodAngle
      )
      * this.orientedSpriteImageSettings.pxHeight,
      //

      // size in image
      this.orientedSpriteImageSettings.pxWidth,
      this.orientedSpriteImageSettings.pxHeight,

      // position on canvas
      //
      pacmanDrawingPositionPx.x,
      pacmanDrawingPositionPx.y,
      //

      // size on canvas
      //
      tileWidthPx * 2 * this.orientedSpriteImageSettings.imageSizeX,
      //
      tileHeightPx * 2 * this.orientedSpriteImageSettings.imageSizeY,
      //
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