import { findMapTileByPosition } from "../../assets/gameAssets";
import { centerMapPattern } from "../../assets/mapPatterns";
import { MapChunk, MapTile, Position } from "../../mapTypes";
import { Proximity, findMapTileWithUndefinedPath, proximitiesToDirection } from "../generatorAssets";

let testIncr: number = 0;

export const basicChunkGenerator = (
  position: Position,
  chunkSize: number,
  /* proximities */
): MapChunk => {

  let tiles: MapTile[] = [];

  for (let i = 0; i < chunkSize; i++) {
    for (let j = 0; j < chunkSize; j++) {
      tiles.push({
        x: position.x + i,
        y: position.y + j,
        path: {
          up: undefined,
          left: undefined,
        },
        mana: null,
      });
    }
  }

  // (0, 0) center map specific chunk generation
  if (position.x === 0 && position.y === 0) {
    let centerChunkPosition: Position = {
      x: chunkSize / 2,
      y: chunkSize / 2,
    };

    tiles.push(...centerMapPattern.map((patternTile: MapTile): MapTile => {
      let tile: MapTile | null = findMapTileByPosition(
        {
          x: patternTile.x + centerChunkPosition.x,
          y: patternTile.y + centerChunkPosition.y,
        },
        tiles,
      );

      if (tile === null) {
        throw new Error('Tile not found');
      }

      tile.path = patternTile.path;

      return tile;
    }));
  }

  // =====================================================================================================
  // now generating tile borders clusters

  // pick random tile
  let cursorTile: MapTile | null = findMapTileWithUndefinedPath(tiles);
  while (cursorTile !== null) {
    let cursorDirection: 'up' | 'left' | 'right' | 'down' = 'up';

    if (cursorTile.path.up === undefined && cursorTile.path.left === undefined) {
      if (Math.random() > 0.5) {
        Math.random() > 0.5 ? cursorDirection = 'up' : cursorDirection = 'down';
      } else {
        Math.random() > 0.5 ? cursorDirection = 'left' : cursorDirection = 'right';
      }
    } else if (cursorTile.path.left === undefined ) {
      Math.random() > 0.5 ? cursorDirection = 'up' : cursorDirection = 'down'
    } else if (cursorTile.path.up === undefined) {
      Math.random() > 0.5 ? cursorDirection = 'left' : cursorDirection = 'right'
    }

    debugger;

    tiles = tileBordersClusterGenerator(
      {
        x: cursorTile.x,
        y: cursorTile.y,
        direction: cursorDirection,
      },
      // deepCopyMapTiles(tiles),
      tiles,
      0.45, // TEMP until fixing loops in cluster generation, which should be a tree instead
    );

    cursorTile = findMapTileWithUndefinedPath(tiles);
  }

  // =====================================================================================================
  return {
    tiles: tiles,
    position,
  };

}

const tileBordersClusterGenerator = (
  cursor: Proximity,
  tiles: MapTile[],
  ratioStrengthTileBordersClusters: number = 0.8,
): MapTile[] => {

  let cursorTile: MapTile = tiles.find(tile => tile.x === cursor.x && tile.y === cursor.y)!;

  // =====================================================================================================
  // cancel recursive function if cursor direction path is already set
  let checkCursorDirectionPath: boolean = false;
  switch (cursor.direction) {
    case 'up':
      checkCursorDirectionPath = cursorTile.path.left !== undefined;
      break;
    case 'left':
      checkCursorDirectionPath = cursorTile.path.up !== undefined;
      break;
    case 'down':
      checkCursorDirectionPath = cursorTile.path.left !== undefined;
      break;
    case 'right':
      checkCursorDirectionPath = cursorTile.path.up !== undefined;
      break;
  }
  
  if (checkCursorDirectionPath) {
    return tiles;
  }

  // =====================================================================================================
  // cancel recursive function and set cursor direction path to true if a proximity direction path at cursor is false

  // gather proximities at cursor into local variable
  let proximitiesAtCursor: Proximity[];
  switch (cursor.direction) {
    case 'up':
      proximitiesAtCursor = proximitiesToDirection.up;
      break;
    case 'left':
      proximitiesAtCursor = proximitiesToDirection.left;
      break;
    case 'right':
      proximitiesAtCursor = proximitiesToDirection.right;
      break;
    case 'down':
      proximitiesAtCursor = proximitiesToDirection.down;
      break;
  }

  // gather available proximities at cursor into local variable for recursive progression
  let proximityUndefinedRelatedDirectionPathTiles: MapTile[] = [];

  for (let i = 0; i < proximitiesAtCursor.length; i++) {
    let proximityTile: MapTile | undefined = tiles.find(tile => tile.x === cursor.x + proximitiesAtCursor[i].x && tile.y === cursor.y + proximitiesAtCursor[i].y);

    if (proximityTile === undefined) {
      continue;
    }

    switch (proximitiesAtCursor[i].direction) {
      case 'up':
        checkCursorDirectionPath = proximityTile.path.left === false;
        if (proximityTile.path.left === undefined) proximityUndefinedRelatedDirectionPathTiles.push(proximityTile);
        break;
      case 'left':
        checkCursorDirectionPath = proximityTile.path.up === false;
        if (proximityTile.path.up === undefined) proximityUndefinedRelatedDirectionPathTiles.push(proximityTile);
        break;
      case 'down':
        checkCursorDirectionPath = proximityTile.path.left === false;
        if (proximityTile.path.left === undefined) proximityUndefinedRelatedDirectionPathTiles.push(proximityTile);
        break;
      case 'right':
        checkCursorDirectionPath = proximityTile.path.up === false;
        if (proximityTile.path.up === undefined) proximityUndefinedRelatedDirectionPathTiles.push(proximityTile);
        break;
    }
  }

  if (checkCursorDirectionPath) {
    switch (cursor.direction) {
      case 'up':
        cursorTile.path.left = true;
        break;
      case 'left':
        cursorTile.path.up = true;
        break;
      case 'down':
        cursorTile.path.left = true;
        break;
      case 'right':
        cursorTile.path.up = true;
        break;
    }
    return tiles;
  }

  // =====================================================================================================
  // else random choose with ratioStrengthTileBordersClusters to set the cursor direction path to false
  // break recursive if true is randomly chosen
  switch (cursor.direction) {
    case 'up':
      cursorTile.path.left = Math.random() > ratioStrengthTileBordersClusters;
      if (cursorTile.path.left) return(tiles);
      break;
    case 'left':
      cursorTile.path.up = Math.random() > ratioStrengthTileBordersClusters;
      if (cursorTile.path.up) return(tiles);
      break;
    case 'down':
      cursorTile.path.left = Math.random() > ratioStrengthTileBordersClusters;
      if (cursorTile.path.left) return(tiles);
      break;
    case 'right':
      cursorTile.path.up = Math.random() > ratioStrengthTileBordersClusters;
      if (cursorTile.path.up) return(tiles);
      break;
  }


  // =====================================================================================================
  // finally if cursor direction path is set to false, propagate recursive function call with new cursors
  // create shuffled list of integer from 0 to size of proximities
  let randomNumbers: number[] = ((array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  })(Array.from(Array(proximitiesAtCursor.length).keys()).map(x => x));

  for (let i = 0; i < randomNumbers.length; i++) {
    let newCursor: Proximity = {
      x: cursor.x + proximitiesAtCursor[randomNumbers[i]].x,
      y: cursor.y + proximitiesAtCursor[randomNumbers[i]].y,
      direction: proximitiesAtCursor[randomNumbers[i]].direction,
    };

    let proximityTile: MapTile | undefined = proximityUndefinedRelatedDirectionPathTiles.find(tile => tile.x === newCursor.x && tile.y === newCursor.y);

    if (proximityTile === undefined) {
      continue;
    }

    debugger;
    console.log('testIncr', testIncr++);

    tiles = tileBordersClusterGenerator(
      newCursor,
      // deepCopyMapTiles(tiles),
      tiles,
      ratioStrengthTileBordersClusters,
    );
    
  }

  return tiles;

}