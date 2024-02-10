"use client";
import Experiences from "@/components/Experiences";
import Profile from "@/components/Profile";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-5">
        <div />
        <div className='col-span-3 flex flex-col gap-6 text-black'>
          <Profile />
          <section id="projects">
            <Projects />
          </section>
          <section id="experiences">
            <Experiences />
          </section>
        </div>
        <div />
      </div>
    </div>
  );
}

