// components/Header/Header.tsx
'use client';
import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>🍎</div>
        <ul className={styles.navList}>
          <li>
            <Link href="/" className={styles.navLink}>
              Apple TV+
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
