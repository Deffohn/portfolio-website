'use client'
import Game from '@/app/pacman-traveler/PacmanTraveler/Game';
import React from 'react';

const PacmanTraveler = () => {
  return (
    <html lang="en">
      <head>
        <title>Pacman Traveler - Maxime Parmentier</title>
      </head>
      <body
        className='h-full min-h-screen bg-black'
      >
        <div className='flex flex-col'>

          <h1 className='flex mx-auto text-white text-center mb-4 mt-4 text-xl'>Pacman Traveler Game</h1>
          <div className='flex mx-auto flex-wrap items-center bg-white rounded'>
            <div className='flex items-center bg-black rounded m-1'>
            <Game/>
            </div>
          </div>
        </div>
      </body>
    </html>
    
  );
};

export default PacmanTraveler;