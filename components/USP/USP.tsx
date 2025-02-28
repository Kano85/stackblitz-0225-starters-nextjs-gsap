'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './USP.module.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const USP_ITEMS: string[] = [
  'New Apple Originals every month — always ad-free.',
  'Stream on the Apple TV app on Apple devices, smart TVs, consoles, or sticks.',
  'Watch in 4K HDR video with immersive Spatial Audio.',
  'Share a single subscription with up to five people.',
];

export default function USP() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Removed background fade-in logic

    // Animate text items with a scrubbed timeline (scroll driven)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
        markers: false, // For debugging; remove in production
        scrub: 1,
      },
    });

    itemsRef.current.forEach((item) => {
      if (!item) return;
      tl.fromTo(
        item,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '+=0.2' // Stagger each animation by 0.2 seconds
      );
    });
  });

  return (
    <div className={styles.usp} ref={containerRef}>
      {/* Optional: Remove the background element if no longer needed */}
      {/* <div className={styles.background} /> */}
      {USP_ITEMS.map((text, index) => (
        <p
          key={index}
          ref={(el) => (itemsRef.current[index] = el)}
          className={styles.item}
        >
          {text}
        </p>
      ))}
    </div>
  );
}
