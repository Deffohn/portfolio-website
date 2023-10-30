import { Hitbox } from "../Hitboxs/Hitbox";
import { orientedSpriteImageSettings } from "../assets/animatedAssets";
import { Direction } from "../mapTypes";
import { GameObject } from "./GameObject";
import { Obstacle } from "./Obstacle";

export class DrawableObject<ObjectHitboxClass extends Hitbox> implements GameObject {
  hitbox: ObjectHitboxClass;
  orientedSpriteImageSettings: orientedSpriteImageSettings;

  constructor(
    hitbox: ObjectHitboxClass,
    orientedSpriteImageSettings: orientedSpriteImageSettings
  ) {
    this.hitbox = hitbox;
    this.orientedSpriteImageSettings = orientedSpriteImageSettings;
  }
  move(_direction: Direction, _speed: number, _obstacles: Obstacle[]): void {
    return;
  }

  refreshAnimationState(/*add frequency parameters*/): void {
    this.orientedSpriteImageSettings.animationSettings.state = 
      ( this.orientedSpriteImageSettings.animationSettings.state
      + this.orientedSpriteImageSettings.animationSettings.rotationDirection )
      % this.orientedSpriteImageSettings.animationSettings.totalFrames;
    if (this.orientedSpriteImageSettings.animationSettings.state < 0)
      this.orientedSpriteImageSettings.animationSettings.state
      += this.orientedSpriteImageSettings.animationSettings.totalFrames;
  }

  canvasDraw(
    ctx: CanvasRenderingContext2D,
    tileWidthPx: number, tileHeightPx: number,
    deltaPacmanXPx: number, deltaPacmanYPx: number,
  ) {
    this.refreshAnimationState();

    ctx.drawImage(
      this.orientedSpriteImageSettings.image,

      // position in image
      //
        this.orientedSpriteImageSettings.animationSettings.state
      * this.orientedSpriteImageSettings.pxWidth,
      //
        0,
      //

      // size in image
      this.orientedSpriteImageSettings.pxWidth,
      this.orientedSpriteImageSettings.pxHeight,

      // position on canvas
      //
      (this.hitbox.x - this.orientedSpriteImageSettings.imageSizeX) * tileWidthPx - deltaPacmanXPx,
      //
      (this.hitbox.y - this.orientedSpriteImageSettings.imageSizeY) * tileHeightPx - deltaPacmanYPx,
      //

      // size on canvas
      //
      tileWidthPx * 2 * this.orientedSpriteImageSettings.imageSizeX,
      //
      tileHeightPx * 2 * this.orientedSpriteImageSettings.imageSizeY,
      //
    );
  }
}