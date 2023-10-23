"use client";
import React from 'react';
import { useEffect, useRef, useState } from "react";
import { generateObstaclesOnChunk } from "./src/assets/gameAssets";
import { Direction, MapChunk, Position } from "./src/mapTypes";
import { PacmanPlayer } from "./src/PacmanPlayer";
import { Obstacle } from "./src/objects/Obstacle";
import { GameMap } from "./src/GameMap";
import { basicChunkGenerator } from "./src/generatorAssets/chunkGenerators/basicChunkGenerator";
import { CogScore } from "./src/objects/CogScore";

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

type KeyboardSetting = {
  name: string,
  toolTipKeyInfo: string,
  left: string,
  up: string,
  right: string,
  down: string,
}

const keyboardSettings: KeyboardSetting[] = [
  {
    name: 'QWERTY',
    toolTipKeyInfo : "WASD",
    left: 'a',
    up: 'w',
    right: 'd',
    down: 's',
  },
  {
    name: 'AZERTY',
    toolTipKeyInfo : "ZQSD",
    left: 'q',
    up: 'z',
    right: 'd',
    down: 's',
  },
];

type GameProps = {
  onTextChange: (text: string) => void;
}

const Game: React.FC<GameProps> = ({onTextChange}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [keyboardSetting, setKeyboardSetting] = useState(keyboardSettings[0]);
  const [nextKeyboardSetting, setNextKeyboardSetting] = useState(keyboardSettings[1]);

  const refreshKeyboardEventListeners = (oldSetting: KeyboardSetting, newSetting: KeyboardSetting) => {
    window.removeEventListener('keydown', (event) => handleKeyDown(event, oldSetting));
    window.removeEventListener('keyup', (event) => handleKeyUp(event, oldSetting));
    window.addEventListener('keydown', (event) => handleKeyDown(event, newSetting));
    window.addEventListener('keyup', (event) => handleKeyUp(event, newSetting));
  }

  const switchKeyboardSetting = () => {
    if (keyboardSetting.name === 'QWERTY') {
      setKeyboardSetting(keyboardSettings[1]);
      setNextKeyboardSetting(keyboardSettings[0]);
      onTextChange(keyboardSettings[1].toolTipKeyInfo);
      refreshKeyboardEventListeners(keyboardSettings[0], keyboardSettings[1]);
    } else {
      setKeyboardSetting(keyboardSettings[0]);
      setNextKeyboardSetting(keyboardSettings[1]);
      onTextChange(keyboardSettings[0].toolTipKeyInfo);
      refreshKeyboardEventListeners(keyboardSettings[1], keyboardSettings[0]);
    }
  }

  const handleKeyDown = (e: { key: string; }, keyboardSetting: KeyboardSetting) => {
  
    if (e.key === keyboardSetting.up) {
      pressedKeys.arrowUp = true;
    } if (e.key === keyboardSetting.down) {
      pressedKeys.arrowDown = true;
    } if (e.key === keyboardSetting.left) {
      pressedKeys.arrowLeft = true;
    } if (e.key === keyboardSetting.right) {
      pressedKeys.arrowRight = true;
    }
  }
  
  const handleKeyUp = (e: { key: string; }, keyboardSetting: KeyboardSetting) => {
  
    if (e.key === keyboardSetting.up) {
      pressedKeys.arrowUp = false;
    } if (e.key === keyboardSetting.down) {
      pressedKeys.arrowDown = false;
    } if (e.key === keyboardSetting.left) {
      pressedKeys.arrowLeft = false;
    } if (e.key === keyboardSetting.right) {
      pressedKeys.arrowRight = false;
    }
  }

  useEffect(() => {
    // Add event listeners for keydown and keyup events
    window.addEventListener('keydown', (event) => handleKeyDown(event, keyboardSetting));
    window.addEventListener('keyup', (event) => handleKeyUp(event, keyboardSetting));

    // Clean up event listeners when the component unmounts
    return () => {
      window.removeEventListener('keydown', (event) => handleKeyDown(event, keyboardSetting));
      window.removeEventListener('keyup', (event) => handleKeyUp(event, keyboardSetting));
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
        x: pacman.hitbox.x,
        y: pacman.hitbox.y,
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
      <div className="flex flex-row gap-2 item-center justify-between">
        <h3 className="text-black m-1">Score: {score}</h3>
        <div className='rounded-sm bg-slate-200'>
          <button className='m-1' onClick={switchKeyboardSetting}>Switch to {nextKeyboardSetting.name}</button>
        </div>
      </div>
      <div className='flex mx-auto flex-wrap items-center rounded'>
        <div className='flex items-center bg-slate-500 rounded m-1 shadow-2xl'>
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

