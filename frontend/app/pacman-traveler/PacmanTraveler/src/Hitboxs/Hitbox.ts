export interface Hitbox {
  x: number;
  y: number;
  isObjectCrossing(hitbox: Hitbox): boolean;
}