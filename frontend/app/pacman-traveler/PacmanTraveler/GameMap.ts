import { MapChunk, MapTile, Position } from "./mapTypes";
import {chunkTileProximityRectangles} from "./generatorAssets/generatorAssets";
import { PacmanPlayer } from "./PacmanPlayer";

export class GameMap {
  chunkWidth: number;
  chunkHeight: number;
  mapWidthInChunks: number;
  mapHeightInChunks: number;

  chunkGenerator: (position: Position, chunkWidth: number, chunkHeight: number, proximityTiles: MapTile[]) => MapChunk;
  chunkTileProximityRectangles: {
    relativeChunkPosition: Position,
    upLeftPosition: Position,
    downRightPosition: Position,
  }[];
  mapChunks: MapChunk[];


  constructor(
    chunkWidth: number, chunkHeight: number,
    mapWidthInChunks: number, mapHeightInChunks: number,
    chunkGenerator: (position: Position, chunkWidth: number, chunkHeight: number, proximityTiles: MapTile[]) => MapChunk,
  ) {
    /**
    * @param mapWidthInChunks - Only odd numbers being at least 3 are supported
    * @param mapHeightInChunks - Only odd numbers being at least 3 are supported
    */
    this.chunkWidth = chunkWidth;
    this.chunkHeight = chunkHeight;

    if (mapWidthInChunks % 2 === 0 || mapHeightInChunks % 2 === 0) {
      throw new Error('Only odd numbers are supported');
    }
    if (mapWidthInChunks < 3 || mapHeightInChunks < 3) {
      throw new Error('Loaded map must be at least 3x3 chunks');
    }

    this.mapWidthInChunks = mapWidthInChunks;
    this.mapHeightInChunks = mapHeightInChunks;

    this.mapChunks = [];

    this.chunkGenerator = chunkGenerator;

    this.chunkTileProximityRectangles = chunkTileProximityRectangles(chunkWidth, chunkHeight,);
  }

  findChunk(chunkPosition: Position): MapChunk | undefined {
    return this.mapChunks.find(
      chunk => chunk.position.x === chunkPosition.x && chunk.position.y === chunkPosition.y
    );
  }

  findProximityTilesToChunk(chunkPosition: Position): MapTile[] {
    let tiles: MapTile[] = [];

    this.chunkTileProximityRectangles.forEach((proximityRectangle) => {
      let chunk = this.findChunk({
        x: chunkPosition.x + proximityRectangle.relativeChunkPosition.x,
        y: chunkPosition.y + proximityRectangle.relativeChunkPosition.y, 
      });

      if (!chunk) return;

      tiles.push(...chunk.tiles.filter(tile => (
        tile.x >= proximityRectangle.upLeftPosition.x + chunkPosition.x + proximityRectangle.relativeChunkPosition.x &&
        tile.x < proximityRectangle.downRightPosition.x + chunkPosition.x + proximityRectangle.relativeChunkPosition.x &&
        tile.y >= proximityRectangle.upLeftPosition.y + chunkPosition.y + proximityRectangle.relativeChunkPosition.y &&
        tile.y < proximityRectangle.downRightPosition.y + chunkPosition.y + proximityRectangle.relativeChunkPosition.y
      )));
    });

    return tiles;
  }

  isPacmanScoring(pacman: PacmanPlayer): boolean {
    let scoring: boolean = false;
    this.mapChunks.forEach(chunk => {
      let gatherCogScored: Position[] = [];
      chunk.cogScores.forEach(cogScore => {
        if (cogScore === undefined) return;
        if (cogScore.isPacmanColliding(pacman.x, pacman.y, pacman.size)) {
          pacman.increaseScore(cogScore.score);
          gatherCogScored.push({ x: cogScore.x, y: cogScore.y});
          scoring = true;
        }
      });

      // delete gatherCogScored
      gatherCogScored.forEach(cogScored => {
        chunk.cogScores = chunk.cogScores.filter(cogScore => {
          return !(cogScore.x === cogScored.x && cogScore.y === cogScored.y);
        });
      });
    });
    return scoring;
  }

  refreshChunks(pacmanPosition: Position): void {

    let pacmanInChunkPosition = {
      x: Math.floor(pacmanPosition.x / this.chunkWidth) * this.chunkWidth,
      y: Math.floor(pacmanPosition.y / this.chunkHeight) * this.chunkHeight,
    };

    // gather chunks not generated, refresh and drop old chunks no longer in pacman's range
    let newMapChunks: MapChunk[] = [];
    let newMapChunkPositionsToGenerate: Position[] = [];

    let widthEuclidianQuotient = Math.floor(this.mapWidthInChunks / 2);
    let heightEuclidianQuotient = Math.floor(this.mapHeightInChunks / 2);
    for (let i = -widthEuclidianQuotient; i < widthEuclidianQuotient + 1; i++) {
      for (let j = -heightEuclidianQuotient; j < heightEuclidianQuotient + 1; j++) {

        let chunkPosition = {
          x: pacmanInChunkPosition.x + i * this.chunkWidth,
          y: pacmanInChunkPosition.y + j * this.chunkHeight,
        };

        let chunk = this.findChunk(chunkPosition);
        if (!chunk) {
          newMapChunkPositionsToGenerate.push(chunkPosition);
        } else {
          newMapChunks.push(chunk);
        }
      }
    }
    this.mapChunks = newMapChunks;

    // shuffle the order of remaining chunk to generate
    newMapChunkPositionsToGenerate = ((positionToShuffle: Position[]): Position[] => {
      for (let i = positionToShuffle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positionToShuffle[i], positionToShuffle[j]] = [positionToShuffle[j], positionToShuffle[i]];
      }
      return positionToShuffle;
    })(newMapChunkPositionsToGenerate);

    // then generate them
    newMapChunkPositionsToGenerate.forEach(chunkPosition => {
      this.mapChunks.push(this.chunkGenerator(
        chunkPosition,
        this.chunkWidth,
        this.chunkHeight,
        this.findProximityTilesToChunk(chunkPosition),
      ));
    });
  }

}