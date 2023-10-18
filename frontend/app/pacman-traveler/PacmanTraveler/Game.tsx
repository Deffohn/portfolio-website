"use client";
import { useEffect, useRef, useState } from "react";
import { generateObstaclesOnChunk } from "./assets/gameAssets";
import { Direction, MapChunk, Position } from "./mapTypes";
import { PacmanPlayer } from "./PacmanPlayer";
import { Obstacle } from "./Obstacle";
import { GameMap } from "./GameMap";
import { basicChunkGenerator } from "./generatorAssets/chunkGenerators/basicChunkGenerator";
import { CogScore } from "./CogScore";

const tileRatioPx = 45;
const tileWidthPx = tileRatioPx;
const tileHeightPx = tileRatioPx;

const mapChunkWidth = 12;
const mapChunkHeight = 12;
const mapWidthInChunks: number = 3
const mapHeightInChunks: number = 3

export const pacmanSize = 0.5; // ratio of tile size
export const pacmanSpeed = 0.06; // ratio of tile size, do prefer 1/n where n is integer 
export const pathBorderWidth = 0.1; // ratio of tile size

const pacmanPlayerImageSrc = "pacman-traveler/resources/pacman.png";

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
  const [score, setScore] = useState(0);

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
      // in the middle of the (0, 0) chunk
      mapChunkWidth / 2, mapChunkHeight / 2, // forces having a free moving zone by the intersection of 4 tiles

      pacmanSize,
      pacmanPlayerImageSrc,
      mapChunkWidth,
      mapChunkHeight,
    );

    const gameMap: GameMap = new GameMap(mapChunkWidth, mapChunkHeight, mapWidthInChunks, mapHeightInChunks, basicChunkGenerator);

    let obstacles: Obstacle[] = [];

    // graphic loop
    setInterval(() => {

      // clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let deltaPacmanPx: Position = pacman.getDeltaPacmanPositionPx(tileWidthPx, tileHeightPx);
      
      // draw tiles
      obstacles.forEach((obstacle : Obstacle) => {
        obstacle.canvasDraw(ctx, tileWidthPx, tileHeightPx, deltaPacmanPx.x, deltaPacmanPx.y);
      });

      // draw cogscores
      gameMap.mapChunks.forEach ((chunk : MapChunk) => {
        chunk.cogScores.forEach((cogScore : CogScore) => {
          cogScore.canvasDraw(ctx, tileWidthPx, tileHeightPx, deltaPacmanPx.x, deltaPacmanPx.y);
      })});

      pacman.canvasDraw(ctx, tileWidthPx, tileHeightPx,);

      setScore(pacman.score);
    }, 25 /*25 default*/ /* ms, frame rate */);

    // process loop
    setInterval(() => {

      gameMap.refreshChunks({
        x: pacman.x,
        y: pacman.y,
      });

      obstacles = gameMap.mapChunks.map((chunk : MapChunk) => generateObstaclesOnChunk(chunk)).flat();

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
        gameMap.isPacmanScoring(pacman);
      }
    }, 25 /*25 default*/ /* ms, game tick rate */);

  }, []);

  return (
    <div>
      <h3 className="text-white">Score: {score}</h3>
      <div className='flex mx-auto flex-wrap items-center bg-white rounded'>
        <div className='flex items-center bg-black rounded m-1'>
          <div className="flex items-center m-1 bg-black">
            <canvas className="outline-none"
              ref={canvasRef}
              width={mapChunkWidth * tileWidthPx}
              height={mapChunkHeight * tileHeightPx}
              tabIndex={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;

