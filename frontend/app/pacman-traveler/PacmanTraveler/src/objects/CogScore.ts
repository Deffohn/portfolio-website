import { CircleHitbox } from "../Hitboxs/CircleHitbox";
import { orientedSpriteImageSettings } from "../assets/animatedAssets";
import { DrawableObject } from "./DrawableObject";
import { Obstacle } from "./Obstacle";

export class CogScore extends DrawableObject<CircleHitbox> implements Obstacle {
  score: number;

  constructor(
    x: number, y: number,
    hitboxRadius: number,
    orientedSpriteImageSettings: orientedSpriteImageSettings,
    scoring: number,
  ) {
    super(
      new CircleHitbox(x, y, hitboxRadius),
      orientedSpriteImageSettings,
    );

    this.score = scoring;
  }

}