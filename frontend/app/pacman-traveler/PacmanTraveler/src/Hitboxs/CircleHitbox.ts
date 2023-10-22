import { Hitbox } from "./Hitbox";
import { RectangleHitbox } from "./RectangleHitbox";

export class CircleHitbox implements Hitbox {
  x: number;
  y: number;
  radius: number;
  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  isObjectCrossing(hitbox: Hitbox): boolean {
    if ('radius' in hitbox) {
      const circle = hitbox as CircleHitbox;

      const distance = Math.sqrt(Math.pow(circle.x - this.x, 2) + Math.pow(circle.y - this.y, 2));

      return distance <= this.radius + circle.radius;
  } else {
      const rectangle = hitbox as RectangleHitbox;

      const circleDistance = {
          x: Math.abs(this.x - rectangle.x - rectangle.width / 2),
          y: Math.abs(this.y - rectangle.y - rectangle.height / 2)
      };

      if (circleDistance.x > (rectangle.width / 2 + this.radius)) {
          return false;
      }
      if (circleDistance.y > (rectangle.height / 2 + this.radius)) {
          return false;
      }

      if (circleDistance.x <= (rectangle.width / 2)) {
          return true;
      }
      if (circleDistance.y <= (rectangle.height / 2)) {
          return true;
      }

      const cornerDistance_sq = Math.pow(circleDistance.x - rectangle.width / 2, 2) + Math.pow(circleDistance.y - rectangle.height / 2, 2);

      return cornerDistance_sq <= Math.pow(this.radius, 2);
  }
  }

}