import Link from 'next/link';
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#jobs">Jobs</a>
        </li>
        <li>
          <a href="#studies">Studies</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;