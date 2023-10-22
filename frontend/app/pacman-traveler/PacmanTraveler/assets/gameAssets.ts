import { pathBorderWidth } from "../Game";
import { Obstacle, RectangleObstacle } from "../src/Obstacle";
import { MapChunk, MapTile, Position } from "../src/mapTypes";

export const findMapTileByPosition = (position: Position, mapTiles: MapTile[]): MapTile | null => {
  let tile: MapTile | undefined = mapTiles.find(
    tileFind => tileFind.x === position.x && tileFind.y === position.y
  );

  if (tile === undefined) {
    return null;
  }

  return tile;
}

export const generateObstaclesOnChunk = (chunk: MapChunk): Obstacle[] => {
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

  return obstacles;
};