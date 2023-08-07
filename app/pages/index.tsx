import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Projects from '../components/Projects/Projects';
import Jobs from '../components/Jobs';
import Studies from '../components/Studies';
import Header from '../components/Header/Header';
import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <Navbar />
      <Header />
      <main>
        <section id="projects">
          <Projects />
        </section>
        <section id="jobs">
          <Jobs />
        </section>
        <section id="studies">
          <Studies />
        </section>
      </main>
    </div>
  );
};

export default Home;