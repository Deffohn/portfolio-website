import React from 'react';
import Image from 'next/image';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <ul className={styles.header}>
      <li className={styles.headerTitle}>
        <h1>Welcome to My Portfolio</h1>
      </li>
      <li className={styles.headerContent}>
        <Image width={250} height={250} src="/maxime-parmentier-1.png" alt="Maxime Parmentier Profile Photo" className={styles.headerPhoto} />
        <div className={styles.headerText}>
          <h2>Maxime Parmentier</h2>
          <p>Soon to be graduated Software Engineer - Cloud Computing DevOps Engineer</p>
        </div>
      </li>
    </ul>
  );
};

export default Header;