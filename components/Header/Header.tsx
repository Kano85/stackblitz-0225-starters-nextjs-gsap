// components/Header/Header.tsx
'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed w-full h-header bg-bg z-20">
      <nav className="h-full flex justify-between items-center max-w-[90%] mx-auto px-[2rem]">
        <div className="text-[1.8rem] leading-none">🍎</div>
        <ul className="flex gap-lg">
          <li>
            <Link
              href="/"
              className="text-[1.6rem] transition-opacity duration-base hover:opacity-80"
            >
              Apple TV+
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
