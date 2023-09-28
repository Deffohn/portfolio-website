export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

export class PacmanPlayer implements Position {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(direction: Direction) {
    switch (direction) {
      case Direction.Up:
        this.y--;
        break;
      case Direction.Down:
        this.y++;
        break;
      case Direction.Left:
        this.x--;
        break;
      case Direction.Right:
        this.x++;
        break;
    }
  }
  
}

export interface MapChunk {
  tiles: GameTile[],
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

export interface Border {
  upWall: boolean,
  leftWall: boolean,
  downWall: boolean,
  rightWall: boolean,
}

export interface Tile extends Position {
  border: Border,
}

export interface GameTile extends Tile {
  mana: Mana | null,
}