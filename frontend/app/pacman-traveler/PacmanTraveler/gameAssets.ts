import { GameTile, MapChunk, Position } from "./mapTypes";

export const mapChunkSize: number = 12;

export const pacmanPlayerImage = new Image();
pacmanPlayerImage.src = "pacman-traveler/resources/pacman.png";

const tilesLocation = "pacman-traveler/resources/tiles/";

export const tileFullOpenPath = new Image();
tileFullOpenPath.src = tilesLocation + "full_open_path_tile.png";


const generateEmptyChunk = (position: Position): MapChunk => {
  const tiles: GameTile[] = [];
  for (let i = 0; i < mapChunkSize; i++) {
    for (let j = 0; j < mapChunkSize; j++) {
      tiles.push({
        x: position.x + i,
        y: position.y + j,
        border: {
          upWall: false,
          leftWall: false,
          downWall: false,
          rightWall: false
        },
        mana: null
      });
    }
  }
  return {
    tiles,
    position
  };
};

const generateThreeByThreeChunks = ( chunkGenerator: (position: Position) => MapChunk) => {
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

export const gameMap: MapChunk[] = generateThreeByThreeChunks(generateEmptyChunk);