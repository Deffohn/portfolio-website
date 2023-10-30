import { Hitbox } from "../Hitboxs/Hitbox";
import { orientedSpriteImageSettings } from "../assets/animatedAssets";
import { Direction, Position } from "../mapTypes";
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
  move(direction: Direction, _speed: number, _obstacles: Obstacle[]): void {
    let newOrientation: number = Math.atan2(direction.y, direction.x) * 180 / Math.PI;
    if (newOrientation < 0) newOrientation += 360;
    this.refreshOrientationState(newOrientation);

    return;
  }

  refreshAnimationState(/*add frequency parameters*/): void {
    this.orientedSpriteImageSettings.animationSettings.state = 
      ( this.orientedSpriteImageSettings.animationSettings.state
      + this.orientedSpriteImageSettings.animationSettings.animationDirection )
      % this.orientedSpriteImageSettings.animationSettings.totalFrames;
    if (this.orientedSpriteImageSettings.animationSettings.state < 0)
      this.orientedSpriteImageSettings.animationSettings.state
      += this.orientedSpriteImageSettings.animationSettings.totalFrames;
  }

  refreshOrientationState(newAngle: number): void {
    let newState: number = Math.floor(
      newAngle
      / this.orientedSpriteImageSettings.orientationSettings.periodAngle
    )
    * this.orientedSpriteImageSettings.orientationSettings.periodAngle;

    this.orientedSpriteImageSettings.orientationSettings.state = newState;
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