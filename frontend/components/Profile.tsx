"use client";
import React from 'react';
import Image from "next/image";

const Profile: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-2 ml-2 mr-2 '>
      <div className='flex flex-col items-center justify-center gap-2'>
        <div className='rounded-[64px] shadow-2xl mb-4'>
          <Image
            className='rounded-[64px]'
            src='/maxime-parmentier-2.png'
            alt='Profile Picture'
            width={240}
            height={240}
          />
        </div>
        <h1 className='text-4xl font-bold text-center'>Maxime Parmentier</h1>
        <h2 className='text-2xl font-bold '>Software Engineer</h2>
        <h3 className='text-xl font-bold '>Backend developer - practicing DevOps - Cloud engineer</h3>
      </div>
    </div> 
  )
};

export default Profile;