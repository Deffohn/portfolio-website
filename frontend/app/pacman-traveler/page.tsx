"use client";
import Game from '@/app/pacman-traveler/PacmanTraveler/Game';
import React from 'react';

const PacmanTraveler = () => {
  const [keyboardSettingToolTip, setKeyboardSettingToolTip] = React.useState('WASD');

  const handleKeyboardSettingToolTipChange = (newKeyboardSettingName: string) => {
    setKeyboardSettingToolTip(newKeyboardSettingName);
  }

  return (
    <html lang="en">
      <head>
        <title>Pacman Traveler - Maxime Parmentier</title>
      </head>
      <body
        className='h-full min-h-screen bg-gray-50'
      >
        <div className='flex flex-col'>

          <h1 className='flex mx-auto flex-wrap text-black text-center mb-4 mt-4 text-3xl'>
            Pacman Traveler Game
          </h1>
          <h2 className='flex mx-auto flex-wrap text-black text-center mb-4 text-lg'>
            This is a game experiment for displaying terrain generation algorithms.
            Use {keyboardSettingToolTip} to move as Pacman. Only playable with a computer keyboard.
          </h2>
          <div className='flex mx-auto flex-wrap items-center'>
            <div className='flex'>
              <Game onTextChange={handleKeyboardSettingToolTipChange}/>
            </div>
          </div>
        </div>
      </body>
    </html>
    
  );
};

export default PacmanTraveler;