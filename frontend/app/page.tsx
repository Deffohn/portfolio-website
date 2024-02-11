"use client";
import Experiences from "@/components/Experiences";
import Profile from "@/components/Profile";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import { useEffect, useState } from "react";

export const RESPONSIVE_WIDTH_LIMIT: number = 1050;

export default function Home() {

  const [screenWidth, setScreenWidth] = useState(RESPONSIVE_WIDTH_LIMIT + 1);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);
  if (screenWidth < RESPONSIVE_WIDTH_LIMIT) {
    return (
      <div>
        <Navbar />
        <div className='col-span-3 flex flex-col gap-6 text-black m-2'>
          <Profile />
          <section id="projects">
            <Projects screenWidth={screenWidth}/>
          </section>
          <section id="experiences">
            <Experiences screenWidth={screenWidth}/>
          </section>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-5">
        <div />
        <div className='col-span-3 flex flex-col gap-6 text-black'>
          <Profile />
          <section id="projects">
            <Projects screenWidth={screenWidth}/>
          </section>
          <section id="experiences">
            <Experiences screenWidth={screenWidth}/>
          </section>
        </div>
        <div />
      </div>
    </div>
  );
}

