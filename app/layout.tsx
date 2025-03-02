//app/layout.tsx

'use client';

import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import Header from '@/components/Header/Header';
import './globals.css';

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
      <body className="bg-bg text-light font-body leading-[1.5] overflow-x-hidden">
        <Header />
        <div id="smooth-wrapper" className="overflow-hidden w-full h-full">
          <div id="smooth-content" className="will-change-transform">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
