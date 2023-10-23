"use client";
import Experiences from "@/components/Experiences";
import Profile from "@/components/Profile";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <div className='flex flex-col gap-2 text-black'>
      <Navbar />
      <Profile />
      <section>
        <main>
          <section id="projects">
            <Projects />
          </section>
          <section id="experiences">
            <Experiences />
          </section>
        </main>
      </section>
    </div>
  );
}

