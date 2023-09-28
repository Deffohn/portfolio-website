import { useEffect, useRef } from "react";
import { gameMap, mapChunkSize, pacmanPlayerImage, tileFullOpenPath } from "./gameAssets";
import { Direction, MapChunk, PacmanPlayer, Tile } from "./mapTypes";

const tileWidthPx = 32;
const tileHeightPx = 32;

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
    );

    setInterval(() => {

      // clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (pressedKeys.arrowUp) {
        pacman.move(Direction.Up);
        pressedKeys.arrowUp = false;
      } if (pressedKeys.arrowDown) {
        pacman.move(Direction.Down);
        pressedKeys.arrowDown = false;
      } if (pressedKeys.arrowLeft) {
        pacman.move(Direction.Left);
        pressedKeys.arrowLeft = false;
      } if (pressedKeys.arrowRight) {
        pacman.move(Direction.Right);
        pressedKeys.arrowRight = false;
      }
      
      gameMap.forEach((chunk : MapChunk) => {

        chunk.tiles.forEach((tile : Tile) => {
          ctx.drawImage(
            // image
            tileFullOpenPath,

            // position on canvas
            tile.x * tileWidthPx,
            tile.y * tileHeightPx,

            // px size on canvas
            tileWidthPx,
            tileHeightPx,
          );
        })
      });

      // draw pacman
      ctx.drawImage(
        // image
        pacmanPlayerImage,

        // position on canvas
        pacman.x * 3,
        pacman.y * 3,

        // px size on canvas
        tileWidthPx/3,
        tileHeightPx/3,
      );
    }, 50 /* ms */);

  }, []);

  const handleKeyDown = (e : React.KeyboardEvent<HTMLCanvasElement>) => {
    console.log(e.key);

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