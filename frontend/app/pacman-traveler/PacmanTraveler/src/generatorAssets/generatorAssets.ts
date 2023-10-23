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

export const chunkTileProximityRectangles = ((chunkWidth: number, chunkHeight: number): {
  relativeChunkPosition: Position,
  upLeftPosition: Position,
  downRightPosition: Position,
}[] => {
  return ([
    {
      relativeChunkPosition: {
        x: chunkWidth,
        y: 0,
      },
      upLeftPosition: {
        x: 0,
        y: 0,
      },
      downRightPosition: {
        x: 1,
        y: chunkHeight,
      },
    },
    {
      relativeChunkPosition: {
        x: chunkWidth,
        y: chunkHeight,
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
        y: chunkHeight,
      },
      upLeftPosition: {
        x: 0,
        y: 0,
      },
      downRightPosition: {
        x: chunkWidth,
        y: 1,
      },
    },
    {
      relativeChunkPosition: {
        x: -chunkWidth,
        y: chunkHeight,
      },
      upLeftPosition: {
        x: chunkWidth - 1,
        y: 0,
      },
      downRightPosition: {
        x: chunkWidth,
        y: 1,
      },
    },
    {
      relativeChunkPosition: {
        x: -chunkWidth,
        y: 0,
      },
      upLeftPosition: {
        x: chunkWidth - 1,
        y: 0,
      },
      downRightPosition: {
        x: chunkWidth,
        y: chunkHeight,
      },
    },
    {
      relativeChunkPosition: {
        x: -chunkWidth,
        y: -chunkHeight,
      },
      upLeftPosition: {
        x: chunkWidth - 1,
        y: chunkHeight - 1,
      },
      downRightPosition: {
        x: chunkWidth,
        y: chunkHeight,
      },
    },
    {
      relativeChunkPosition: {
        x: 0,
        y: -chunkHeight,
      },
      upLeftPosition: {
        x: 0,
        y: chunkHeight - 1,
      },
      downRightPosition: {
        x: chunkWidth,
        y: chunkHeight,
      },
    },
    {
      relativeChunkPosition: {
        x: chunkWidth,
        y: -chunkHeight,
      },
      upLeftPosition: {
        x: 0,
        y: chunkHeight - 1,
      },
      downRightPosition: {
        x: 1,
        y: chunkHeight,
      },
    },
  ]);
});

const cogScoreImageSrcStorage = "pacman-traveler/resources/cogscores/";
export const cogTypes: {
  imagePath: string,
  score: number,
  probabilityWeight: number,
  totalFrames: number,
  pxPeriod: number,
  ySize: number,
  imageSizeX: number,
  imageSizeY: number,
  hitboxRadius: number,
}[] = [
  {
    imagePath: cogScoreImageSrcStorage+"red_cogscore.png",
    score: 2,
    probabilityWeight: 5,
    totalFrames: 8,
    pxPeriod: 256,
    ySize: 256,
    imageSizeX: 0.9,
    imageSizeY: 0.9,
    hitboxRadius: 0.3897,
  },
  {
    imagePath: cogScoreImageSrcStorage+"green_cogscore.png",
    score: 3,
    probabilityWeight: 3,
    totalFrames: 9,
    pxPeriod: 256,
    ySize: 256,
    imageSizeX: 0.8,
    imageSizeY: 0.8,
    hitboxRadius: 0.3875,
  },
  {
    imagePath: cogScoreImageSrcStorage+"blue_cogscore.png",
    score: 7,
    probabilityWeight: 1,
    totalFrames: 8,
    pxPeriod: 256,
    ySize: 256,
    imageSizeX: 0.6,
    imageSizeY: 0.6,
    hitboxRadius: 0.29,
  },
]