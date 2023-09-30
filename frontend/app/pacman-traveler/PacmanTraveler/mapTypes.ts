import { Obstacle } from "./Obstacle";

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
}

export interface Chunk {
  obstacles: Obstacle[],

  position: Position,
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
  up: boolean,
  left: boolean,
}

export interface MapTile extends Position {
  path: Path,
  mana: Mana | null,
}