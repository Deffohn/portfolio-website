import { MapChunk, Position } from "./mapTypes";

export class GameMap {
  chunkSizeInTiles: number;
  mapWidthInChunks: number;
  mapHeightInChunks: number;

  chunkGenerator: (position: Position, /* proximities */) => MapChunk;
  mapChunks: MapChunk[];


  constructor(
    chunkSizeInTiles: number,
    mapWidthInChunks: number, mapHeightInChunks: number,
    chunkGenerator: (position: Position, /* proximities */) => MapChunk,
  ) {
    /**
    * @param mapWidthInChunks - Only odd numbers at least 3 are supported
    * @param mapHeightInChunks - Only odd numbers at least 3 are supported
    */
    this.chunkSizeInTiles = chunkSizeInTiles;

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
  }

  refreshChunks(pacmanPosition: Position): void {
    let pacmanInChunkPosition = {
      x: Math.floor(pacmanPosition.x / this.chunkSizeInTiles) * this.chunkSizeInTiles,
      y: Math.floor(pacmanPosition.y / this.chunkSizeInTiles) * this.chunkSizeInTiles,
    };

    let widthEuclidianQuotient = Math.floor(this.mapWidthInChunks / 2);
    let heightEuclidianQuotient = Math.floor(this.mapHeightInChunks / 2);
    for (let i = -widthEuclidianQuotient; i < widthEuclidianQuotient + 1; i++) {
      for (let j = -heightEuclidianQuotient; j < heightEuclidianQuotient + 1; j++) {
        let chunkPosition = {
          x: pacmanInChunkPosition.x + i * this.chunkSizeInTiles,
          y: pacmanInChunkPosition.y + j * this.chunkSizeInTiles,
        };
        if (!this.checkChunkExists(chunkPosition)) {
          this.mapChunks.push(this.chunkGenerator(chunkPosition, /* proximities */));
        }
      }
    }
  }

  checkChunkExists(chunkPosition: Position): boolean {
    return this.mapChunks.some(
      chunk => chunk.position.x === chunkPosition.x && chunk.position.y === chunkPosition.y
    );
  }



}