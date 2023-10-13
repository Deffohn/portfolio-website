import { mapChunkSize, pathBorderWidth } from "../Game";
import { Obstacle, RectangleObstacle } from "../Obstacle";
import { MapChunk, MapTile, Position } from "../mapTypes";

export const findMapTileByPosition = (position: Position, mapTiles: MapTile[]): MapTile | null => {
  let tile: MapTile | undefined = mapTiles.find(
    tileFind => tileFind.x === position.x && tileFind.y === position.y
  );

  if (tile === undefined) {
    return null;
  }

  return tile;
}

export const generateEmptyChunk = (position: Position): MapChunk => {
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

export const generateObjectsAndObstaclesOnChunk = (chunk: MapChunk): Chunk => {
  const obstacles: Obstacle[] = [];

  // generate tile obstacles "borders"
  chunk.tiles.forEach(tile => {
    if (tile.path.up == false) {
      obstacles.push(new RectangleObstacle(
        tile.x - pathBorderWidth/2, tile.y - pathBorderWidth/2, 1 + pathBorderWidth, pathBorderWidth
      ));
    }
    if (tile.path.left == false) {
      obstacles.push(new RectangleObstacle(
        tile.x - pathBorderWidth/2, tile.y - pathBorderWidth/2, pathBorderWidth, 1 + pathBorderWidth
      ));
    }
  });

  return {
    obstacles,
    position: chunk.position,
  };
};