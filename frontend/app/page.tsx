import Experiences from "@/components/Experiences";
import Profile from "@/components/Profile";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Studies from "@/components/Studies";

export default function Home() {
  return (
    <div className='flex flex-col gap-2 text-white'>
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
          <section id="studies">
            <Studies />
          </section>
        </main>
      </section>
    </div>
  );
}

