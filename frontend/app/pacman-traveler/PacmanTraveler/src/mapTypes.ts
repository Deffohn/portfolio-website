import { CogScore } from "./objects/CogScore";
import { Obstacle } from "./objects/Obstacle";

export class Direction implements Position {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export interface MapChunk {
  tiles: MapTile[],
  position: Position,
  cogScores: CogScore[],
  obstacles?: Obstacle[],
}

export enum ManaType {
  Water,
  Fire,
  Air,
  Earth,
}

export interface Mana {
  kind: ManaType,
  score: number,
}

export interface Position {
  x: number,
  y: number,
}

export interface Path {
  up: boolean | undefined,
  left: boolean | undefined,
}

export interface MapTile extends Position {
  path: Path,
  mana: Mana | null,
}