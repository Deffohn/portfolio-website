import { useEffect, useRef } from "react";
import { gameMap, mapChunkSize, pacmanSize, pacmanSpeed } from "./gameAssets";
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

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pacman = new PacmanPlayer(
      mapChunkSize / 2, mapChunkSize / 2,
      pacmanSize,
    );

    const pacmanPlayerImage = new Image();
    pacmanPlayerImage.src = pacmanPlayerImageSrc;

    setInterval(() => {

      // clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let obstacles: Obstacle[] = gameMap.flatMap((chunk : Chunk) => chunk.obstacles);

      // TODO handle multiple keys pressed at once
      if (pressedKeys.arrowUp) {
        pacman.move(Direction.Up, pacmanSpeed, obstacles);
        pressedKeys.arrowUp = false;
      } if (pressedKeys.arrowDown) {
        pacman.move(Direction.Down, pacmanSpeed, obstacles);
        pressedKeys.arrowDown = false;
      } if (pressedKeys.arrowLeft) {
        pacman.move(Direction.Left, pacmanSpeed, obstacles);
        pressedKeys.arrowLeft = false;
      } if (pressedKeys.arrowRight) {
        pacman.move(Direction.Right, pacmanSpeed, obstacles);
        pressedKeys.arrowRight = false;
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
    }, 50 /* ms, frame rate */);

  }, []);

  const handleKeyDown = (e : React.KeyboardEvent<HTMLCanvasElement>) => {
    // console.log(e.key);

    if (e.key === 'w') {
      pressedKeys.arrowUp = true;
    } else if (e.key === 's') {
      pressedKeys.arrowDown = true;
    } else if (e.key === 'a') {
      pressedKeys.arrowLeft = true;
    } else if (e.key === 'd') {
      pressedKeys.arrowRight = true;
    }
  }

  return (
    <div className="flex">
      <canvas
        ref={canvasRef}
        width={3 * mapChunkSize * tileWidthPx}
        height={3 * mapChunkSize * tileHeightPx}
        onKeyDown={(e)=>handleKeyDown(e)}
        tabIndex={0}
      />
    </div>
  );
};

export default Game;