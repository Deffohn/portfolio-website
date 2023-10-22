import { CircleHitbox } from "../Hitboxs/CircleHitbox";
import { Direction } from "../mapTypes";
import { Obstacle } from "./Obstacle";

export class CogScore implements Obstacle {
  hitbox: CircleHitbox;
  animatedImage: {
    image: HTMLImageElement,
    totalFrames: number,
    pxPeriod: number,
    ySize: number,
    rotationDirection: -1 | 1,
    state: number,
  };
  score: number;

  constructor(
    x: number, y: number,
    imageForAnimation: string,
    scoring: number,
    animationTotalFrames: number,
    animationPxPeriod: number,
    animationYSize: number,
    animationRotationDirection: -1 | 1,
    stateToBegin: number,
  ) {
    this.hitbox = new CircleHitbox(x, y, 0.5);

    this.animatedImage = {
      image: new Image(),
      totalFrames: animationTotalFrames,
      pxPeriod: animationPxPeriod,
      ySize: animationYSize,
      rotationDirection: animationRotationDirection,
      state: stateToBegin,
    };
    this.animatedImage.image.src = imageForAnimation;

    this.score = scoring;
  }
  move(_direction: Direction, _speed: number, _obstacles: Obstacle[]): void {
    return;
  }

  canvasDraw(
    ctx: CanvasRenderingContext2D,
    tileWidthPx: number, tileHeightPx: number,
    deltaPacmanXPx: number, deltaPacmanYPx: number,
  ) {
    // refresh animation state
    this.animatedImage.state = (this.animatedImage.state + this.animatedImage.rotationDirection) % this.animatedImage.totalFrames;
    if (this.animatedImage.state < 0) this.animatedImage.state += this.animatedImage.totalFrames;

    ctx.drawImage(
      this.animatedImage.image,

      // position in image
      this.animatedImage.state * this.animatedImage.pxPeriod, 0,

      // size in image
      this.animatedImage.pxPeriod, this.animatedImage.ySize,

      // position on canvas
      (this.hitbox.x - 0.5) * tileWidthPx - deltaPacmanXPx, (this.hitbox.y - 0.5) * tileHeightPx - deltaPacmanYPx,

      // size on canvas
      tileWidthPx * 2 * this.hitbox.radius, tileHeightPx * 2 * this.hitbox.radius,
    );
  }

}