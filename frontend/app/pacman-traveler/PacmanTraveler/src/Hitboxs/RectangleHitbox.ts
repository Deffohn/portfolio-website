import { CircleHitbox } from "./CircleHitbox";
import { Hitbox } from "./Hitbox";

export class RectangleHitbox implements Hitbox {
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
  isObjectCrossing(hitbox: Hitbox): boolean {
    if ('radius' in hitbox) {
      const circle = hitbox as CircleHitbox;
      const circleDistance = {
          x: Math.abs(circle.x - this.x - this.width / 2),
          y: Math.abs(circle.y - this.y - this.height / 2)
      };

      if (circleDistance.x > (this.width / 2 + circle.radius)) {
          return false;
      }
      if (circleDistance.y > (this.height / 2 + circle.radius)) {
          return false;
      }

      if (circleDistance.x <= (this.width / 2)) {
          return true;
      }
      if (circleDistance.y <= (this.height / 2)) {
          return true;
      }

      const cornerDistance_sq = Math.pow(circleDistance.x - this.width / 2, 2) + Math.pow(circleDistance.y - this.height / 2, 2);

      return cornerDistance_sq <= Math.pow(circle.radius, 2);
  } else {
      const rectangle = hitbox as RectangleHitbox;

      return (
        this.x < rectangle.x + rectangle.width &&
        this.x + this.width > rectangle.x &&
        this.y < rectangle.y + rectangle.height &&
        this.y + this.height > rectangle.y
      );
  }
  }

}