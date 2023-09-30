import { useEffect, useRef } from "react";
import { gameMap, mapChunkSize, pacmanSize, pacmanSpeed } from "./assets/gameAssets";
import { Chunk, Direction } from "./mapTypes";
import { PacmanPlayer } from "./PacmanPlayer";
import { Obstacle } from "./Obstacle";

const tileRatioPx = 48;
const tileWidthPx = tileRatioPx;
const tileHeightPx = tileRatioPx;

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

    const pacmanPlayerImage = new Image();
    pacmanPlayerImage.src = pacmanPlayerImageSrc;

    setInterval(() => {

      // clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let obstacles: Obstacle[] = gameMap.flatMap((chunk : Chunk) => chunk.obstacles);

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
      
      // draw tiles
      gameMap.forEach((chunk : Chunk) => {

        chunk.obstacles.forEach((obstacle : Obstacle) => {
          obstacle.canvasDraw(ctx, tileWidthPx, tileHeightPx);
        });

      });

      // draw pacman
      ctx.drawImage(
        pacmanPlayerImage,

        // position on canvas
        (pacman.x - pacmanSize / 2) * tileRatioPx,
        (pacman.y - pacmanSize / 2) * tileRatioPx,

        // px size on canvas
        tileWidthPx * pacmanSize,
        tileHeightPx * pacmanSize,
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