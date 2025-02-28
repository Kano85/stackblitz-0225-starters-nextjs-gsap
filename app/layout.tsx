'use client';

import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import Header from '@/components/Header/Header';
import './global.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useGSAP(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    try {
      ScrollSmoother.create({
        smooth: 0.9,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
      });
    } catch (error) {
      console.error('ScrollSmoother error:', error);
    }
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <title>Apple TV+ Clone</title>
        <meta
          name="description"
          content="Apple TV+ Clone with GSAP Animations"
        />
      </head>
      <body>
        <Header />
        <div id="smooth-wrapper">
          <div id="smooth-content">{children}</div>
        </div>
      </body>
    </html>
  );
}
