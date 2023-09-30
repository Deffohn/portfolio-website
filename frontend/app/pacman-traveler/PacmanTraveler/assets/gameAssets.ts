import { Obstacle, RectangleObstacle } from "../Obstacle";
import { Chunk, MapChunk, MapTile, Position } from "../mapTypes";

export const mapChunkSize: number = 12;

export const pacmanSize = 0.5; // ratio of tile size
export const pacmanSpeed = 0.06; // ratio of tile size, do prefer 1/n where n is integer 
const pathBorderWidth = 0.1; // ratio of tile size

const generateEmptyChunk = (position: Position): MapChunk => {
  const tiles: MapTile[] = [];
  for (let i = 0; i < mapChunkSize; i++) {
    for (let j = 0; j < mapChunkSize; j++) {
      tiles.push({
        x: position.x + i,
        y: position.y + j,
        path: {
          up: true,
          left: true,
        },
        mana: null,
      });
    }
  }
  return {
    tiles,
    position
  };
};

const generateSampleChunk = (position: Position): MapChunk => {
  const tiles: MapTile[] = [];
  for (let i = 0; i < mapChunkSize; i++) {
    for (let j = 0; j < mapChunkSize; j++) {
      tiles.push({
        x: position.x + i,
        y: position.y + j,
        path: {
          up: true,
          left: Math.random() > 0.5,
        },
        mana: null,
      });
    }
  }
  return {
    tiles,
    position
  };
};

const generateThreeByThreeChunks = ( 
  chunkGenerator: (position: Position) => MapChunk

) => {
  const map: MapChunk[] = [];
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let x = i * mapChunkSize;
      let y = j * mapChunkSize;
      map.push(
        chunkGenerator({ x, y })
      );
    }
  }
  return map;
};

const mapChunks: MapChunk[] = generateThreeByThreeChunks(generateSampleChunk);

// then generate objects and assign images (here obstacles "borders" of each tile)

const generateObjectsAndObstaclesOnChunk = (chunk: MapChunk): Chunk => {

  const obstacles: Obstacle[] = [];

  // generate tile obstacles "borders"
  chunk.tiles.forEach(tile => {
    if (!tile.path.up) {
      obstacles.push(new RectangleObstacle(tile.x - pathBorderWidth/2, tile.y - pathBorderWidth/2, 1 + pathBorderWidth, pathBorderWidth));
    }
    if (!tile.path.left) {
      obstacles.push(new RectangleObstacle(tile.x - pathBorderWidth/2, tile.y - pathBorderWidth/2, pathBorderWidth, 1 + pathBorderWidth));
    }
  });

  return {
    obstacles,
    position: chunk.position,
  };
}

export const gameMap: Chunk[] = mapChunks.map(
  (mapChunk) => generateObjectsAndObstaclesOnChunk(mapChunk)
);