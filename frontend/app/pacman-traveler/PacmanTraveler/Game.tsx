import { useEffect, useRef } from "react";
import { generateObjectsAndObstaclesOnChunk, generateSampleChunk } from "./assets/gameAssets";
import { Chunk, Direction, MapChunk, Position } from "./mapTypes";
import { PacmanPlayer } from "./PacmanPlayer";
import { Obstacle } from "./Obstacle";
import { GameMap } from "./GameMap";

const tileRatioPx = 48;
const tileWidthPx = tileRatioPx;
const tileHeightPx = tileRatioPx;

export const mapChunkSize: number = 12
const mapWidthInChunks: number = 3
const mapHeightInChunks: number = 3

export const pacmanSize = 0.5; // ratio of tile size
export const pacmanSpeed = 0.06; // ratio of tile size, do prefer 1/n where n is integer 
export const pathBorderWidth = 0.1; // ratio of tile size

const pacmanPlayerImageSrc = "pacman-traveler/resources/pacman.png";
const pacmanDrawingPositionPx = (mapChunkSize / 2 - pacmanSize / 2) * tileRatioPx;
const pacmanWidthPx = pacmanSize * tileWidthPx;
const pacmanHeightPx = pacmanSize * tileHeightPx;

// create absolute object storing pressed keys
const pressedKeys = {
  arrowUp: false,
  arrowDown: false,
  arrowLeft: false,
  arrowRight: false,
};

const handleKeyDown = (e: { key: string; }) => {
  // console.log(e.key);

  if (e.key === 'w') {
    pressedKeys.arrowUp = true;
  } if (e.key === 's') {
    pressedKeys.arrowDown = true;
  } if (e.key === 'a') {
    pressedKeys.arrowLeft = true;
  } if (e.key === 'd') {
    pressedKeys.arrowRight = true;
  }
}

const handleKeyUp = (e: { key: string; }) => {
  // console.log(e.key);

  if (e.key === 'w') {
    pressedKeys.arrowUp = false;
  } if (e.key === 's') {
    pressedKeys.arrowDown = false;
  } if (e.key === 'a') {
    pressedKeys.arrowLeft = false;
  } if (e.key === 'd') {
    pressedKeys.arrowRight = false;
  }
}

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Add event listeners for keydown and keyup events
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Clean up event listeners when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pacman = new PacmanPlayer(
      (mapChunkSize + 1) / 2, (mapChunkSize + 1) / 2,
      pacmanSize,
    );

    
    const gameMap: GameMap = new GameMap(mapChunkSize, mapWidthInChunks, mapHeightInChunks, generateSampleChunk);

    const pacmanPlayerImage = new Image();
    pacmanPlayerImage.src = pacmanPlayerImageSrc;

    setInterval(() => {

      // clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      gameMap.refreshChunks({
        x: pacman.x,
        y: pacman.y,
      });

      let obstacles: Obstacle[] = gameMap.mapChunks.map((chunk : MapChunk) => generateObjectsAndObstaclesOnChunk(chunk).obstacles).flat();

      // TODO handle multiple keys pressed at once
      let direction: Direction = new Direction(0, 0);
      if (pressedKeys.arrowUp) {
        direction.y += -1;
      } if (pressedKeys.arrowDown) {
        direction.y += 1;
      } if (pressedKeys.arrowLeft) {
        direction.x += -1;
      } if (pressedKeys.arrowRight) {
        direction.x += 1;
      }

      if (direction.x !== 0 || direction.y !== 0) {
        pacman.move(direction, pacmanSpeed, obstacles);
      }

      let deltaPacmanPx: Position = {
        x: pacman.x * tileWidthPx - pacmanDrawingPositionPx - pacmanWidthPx / 2,
        y: pacman.y * tileHeightPx - pacmanDrawingPositionPx - pacmanHeightPx / 2,
      };
      
      // draw tiles
      obstacles.forEach((obstacle : Obstacle) => {
        obstacle.canvasDraw(ctx, tileWidthPx, tileHeightPx, deltaPacmanPx.x, deltaPacmanPx.y);
      });

      // draw pacman
      ctx.drawImage(
        pacmanPlayerImage,

        // position on canvas
        pacmanDrawingPositionPx,
        pacmanDrawingPositionPx,

        // px size on canvas
        pacmanWidthPx,
        pacmanHeightPx,
      );
    }, 25 /*25 default*/ /* ms, frame rate */);

  }, []);

  return (
    <div className="flex">
      <canvas
        ref={canvasRef}
        width={mapChunkSize * tileWidthPx}
        height={mapChunkSize * tileHeightPx}
        tabIndex={0}
      />
    </div>
  );
};

export default Game;

