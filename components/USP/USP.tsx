// components/USP/USP.tsx
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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%', // Start animation later in scroll
        end: 'top 10%', // Extend animation range
        toggleActions: 'play none none reverse',
        markers: false,
        scrub: 1.5, // Smoother scrubbing
      },
    });

    // Initial delay before first item appears
    tl.to({}, { duration: 1 }); // 0.3 second delay

    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      tl.fromTo(
        item,
        {
          opacity: 0,
          y: 100, // Start further down
          filter: 'blur(5px)', // Add blur effect
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2, // Longer duration
          ease: 'power4.out', // Smoother easing
        },
        index === 0 ? '>' : '+=0.15' // Smaller stagger between items
      );
    });
  });

  return (
    <div className={styles.usp} ref={containerRef}>
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
