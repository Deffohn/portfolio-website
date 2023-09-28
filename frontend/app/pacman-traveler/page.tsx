'use client'
import Game from '@/app/pacman-traveler/PacmanTraveler/Game';
import React from 'react';

const PacmanTraveler = () => {
  return (
    <div>
      <h1 className='white'>Pacman Traveler Game</h1>
      <div>
        <Game/>
      </div>
    </div>
  );
};

export default PacmanTraveler;