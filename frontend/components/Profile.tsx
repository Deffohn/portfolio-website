import React from 'react';
import Image from "next/image";

const Profile: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-2 ml-2 mr-2'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <Image
          className='rounded-full w-full h-auto sm:w-1/2 sm:h-auto'
          src='/maxime-parmentier-1.png'
          alt='Profile Picture'
          width={200}
          height={200}
        />
        <h1 className='text-4xl font-bold text-center'>Maxime Parmentier</h1>
        <h2 className='text-2xl font-bold '>Software Engineer</h2>
        <h3 className='text-xl font-bold '>Backend developer - DevOps - Cloud</h3>
      </div>
    </div> 
  )
};

export default Profile;