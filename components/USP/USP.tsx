'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
        start: 'top 60%',
        end: 'top 10%',
        toggleActions: 'play none none reverse',
        markers: false,
        scrub: 1.5,
      },
    });

    tl.to({}, { duration: 1 });

    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      tl.fromTo(
        item,
        {
          opacity: 0,
          y: 100,
          filter: 'blur(5px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power4.out',
        },
        index === 0 ? '>' : '+=0.15'
      );
    });
  });

  return (
    <div
      className="relative z-[6] py-32 px-24 min-h-screen flex flex-col justify-center gap-16 overflow-hidden max-md:py-24 max-md:px-8"
      ref={containerRef}
    >
      {USP_ITEMS.map((text, index) => (
        <p
          key={index}
          ref={(el) => (itemsRef.current[index] = el)}
          className="relative z-[2] font-semibold leading-[1.1] my-8 max-w-[75%] max-md:max-w-full"
          style={{
            fontSize: 'var(--item-font-size)',
            willChange: 'transform, opacity, filter',
            transformStyle: 'preserve-3d',
          }}
        >
          {text}
        </p>
      ))}

      <style jsx>{`
        .relative {
          --item-font-size: clamp(3rem, 8vw, 5.5rem);
        }

        @media (max-width: 767px) {
          .relative {
            --item-font-size: clamp(2.5rem, 6vw, 4rem);
          }
        }
      `}</style>
    </div>
  );
}
