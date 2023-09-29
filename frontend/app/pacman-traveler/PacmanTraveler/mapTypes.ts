import { Obstacle } from "./Obstacle";

export enum Direction {
  Up,
  Down,
  Left,
  Right,
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