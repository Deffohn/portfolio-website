import { MapTile } from "../mapTypes";

export const findMapTileWithUndefinedPath = (
  mapTiles: MapTile[],
): MapTile | null => {

  let tilesWithUndefinedPath: MapTile[] = mapTiles.filter(
    tile => tile.path.up === undefined || tile.path.left === undefined
  );

  console.log("length of tilesWithUndefinedPath: ", tilesWithUndefinedPath.length);

  // pick random tile in tilesWithUndefinedPath
  let tile: MapTile | null = (() => tilesWithUndefinedPath.length !== 0 ? tilesWithUndefinedPath[
    Math.floor(Math.random() * tilesWithUndefinedPath.length)
  ] : null)();

  return tile === null ? null : tile;
}

export interface Proximity {
  x: number,
  y: number,
  direction: 'up' | 'left' | 'right' | 'down',
}

export const proximitiesToDirection: {
  'left': Proximity[], 'right': Proximity[], 'up': Proximity[], 'down': Proximity[],
} = {
  'left': [
    {
      x: 0,
      y: 0,
      direction: 'down',
    },
    {
      x: -1,
      y: 0,
      direction: 'left',
    },
    {
      x: 0,
      y: -1,
      direction: 'up',
    },
  ],
  'right': [
    {
      x: 1,
      y: -1,
      direction: 'up',
    },
    {
      x: 1,
      y: 0,
      direction: 'right',
    },
    {
      x: 1,
      y: 0,
      direction: 'down',
    },
  ],
  'up': [
    {
      x: 0,
      y: 0,
      direction: 'right',
    },
    {
      x: 0,
      y: -1,
      direction: 'up',
    },
    {
      x: -1,
      y: 0,
      direction: 'left',
    },
  ],
  'down': [
    {
      x: -1,
      y: 1,
      direction: 'left',
    },
    {
      x: 0,
      y: 1,
      direction: 'down',
    },
    {
      x: 0,
      y: 1,
      direction: 'right',
    },
  ],
}