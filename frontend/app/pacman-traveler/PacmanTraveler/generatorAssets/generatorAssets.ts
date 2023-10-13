import { MapTile, Position } from "../mapTypes";

export const findMapTileWithUndefinedPath = (
  mapTiles: MapTile[],
): MapTile | null => {

  let tilesWithUndefinedPath: MapTile[] = mapTiles.filter(
    tile => tile.path.up === undefined || tile.path.left === undefined
  );

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

export const chunkTileProximityRectangles = ((chunkSizeInTiles: number): {
  relativeChunkPosition: Position,
  upLeftPosition: Position,
  downRightPosition: Position,
}[] => {
  return ([
    {
      relativeChunkPosition: {
        x: chunkSizeInTiles,
        y: 0,
      },
      upLeftPosition: {
        x: 0,
        y: 0,
      },
      downRightPosition: {
        x: 1,
        y: chunkSizeInTiles,
      },
    },
    {
      relativeChunkPosition: {
        x: chunkSizeInTiles,
        y: chunkSizeInTiles,
      },
      upLeftPosition: {
        x: 0,
        y: 0,
      },
      downRightPosition: {
        x: 1,
        y: 1,
      },
    },
    {
      relativeChunkPosition: {
        x: 0,
        y: chunkSizeInTiles,
      },
      upLeftPosition: {
        x: 0,
        y: 0,
      },
      downRightPosition: {
        x: chunkSizeInTiles,
        y: 1,
      },
    },
    {
      relativeChunkPosition: {
        x: -chunkSizeInTiles,
        y: chunkSizeInTiles,
      },
      upLeftPosition: {
        x: chunkSizeInTiles - 1,
        y: 0,
      },
      downRightPosition: {
        x: chunkSizeInTiles,
        y: 1,
      },
    },
    {
      relativeChunkPosition: {
        x: -chunkSizeInTiles,
        y: 0,
      },
      upLeftPosition: {
        x: chunkSizeInTiles - 1,
        y: 0,
      },
      downRightPosition: {
        x: chunkSizeInTiles,
        y: chunkSizeInTiles,
      },
    },
    {
      relativeChunkPosition: {
        x: -chunkSizeInTiles,
        y: -chunkSizeInTiles,
      },
      upLeftPosition: {
        x: chunkSizeInTiles - 1,
        y: chunkSizeInTiles - 1,
      },
      downRightPosition: {
        x: chunkSizeInTiles,
        y: chunkSizeInTiles,
      },
    },
    {
      relativeChunkPosition: {
        x: 0,
        y: -chunkSizeInTiles,
      },
      upLeftPosition: {
        x: 0,
        y: chunkSizeInTiles - 1,
      },
      downRightPosition: {
        x: chunkSizeInTiles,
        y: chunkSizeInTiles,
      },
    },
    {
      relativeChunkPosition: {
        x: chunkSizeInTiles,
        y: -chunkSizeInTiles,
      },
      upLeftPosition: {
        x: 0,
        y: chunkSizeInTiles - 1,
      },
      downRightPosition: {
        x: 1,
        y: chunkSizeInTiles,
      },
    },
  ]);
});

const cogScoreImageSrcStorage = "pacman-traveler/resources/cogscores/";
export const cogTypes: {
  imagePath: string,
  score: number,
  totalFrames: number,
  pxPeriod: number,
  ySize: number,
}[] = [
  {
    imagePath: cogScoreImageSrcStorage+"red_cogscore.png",
    score: 2,
    totalFrames: 8,
    pxPeriod: 256,
    ySize: 256,
  },
  {
    imagePath: cogScoreImageSrcStorage+"green_cogscore.png",
    score: 3,
    totalFrames: 8,
    pxPeriod: 256,
    ySize: 256,
  },
]