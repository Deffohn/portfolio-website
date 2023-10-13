import { Position } from "./mapTypes";

export class CogScore implements Position {
  x: number;
  y: number;
  animatedImage: {
    image: HTMLImageElement,
    totalFrames: number,
    pxPeriod: number,
    ySize: number,
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
    stateToBegin: number,
  ) {
    this.x = x;
    this.y = y;

    this.animatedImage = {
      image: new Image(),
      totalFrames: animationTotalFrames,
      pxPeriod: animationPxPeriod,
      ySize: animationYSize,
      state: stateToBegin,
    };
    this.animatedImage.image.src = imageForAnimation;

    this.score = scoring;
  }

  canvasDraw(
    ctx: CanvasRenderingContext2D,
    tileWidthPx: number, tileHeightPx: number,
    deltaPacmanXPx: number, deltaPacmanYPx: number,
  ) {
    // refresh animation state
    this.animatedImage.state = (this.animatedImage.state + 1) % this.animatedImage.totalFrames;

    ctx.drawImage(
      this.animatedImage.image,

      // position in image
      this.animatedImage.state * this.animatedImage.pxPeriod, 0,

      // size in image
      this.animatedImage.pxPeriod, this.animatedImage.ySize,

      // position on canvas
      this.x * tileWidthPx - deltaPacmanXPx, this.y * tileHeightPx - deltaPacmanYPx,

      // size on canvas
      tileWidthPx, tileHeightPx,
    );
  }

}