// components/Hero/Hero.tsx
'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Hero.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroSectionRef.current || !videoRef.current || !contentRef.current)
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        pin: true,
        pinSpacing: false,
        markers: true, // Keep markers for debugging
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    tl.addLabel('start');

    // Video fade-out starts earlier in the scroll
    tl.to(
      videoRef.current,
      {
        opacity: 0,
        ease: 'power1.in',
      },
      'start+=0' // Adjusted from 0.3 to start fade sooner
    );

    // Content fade starts earlier relative to video animation
    tl.to(
      contentRef.current,
      {
        opacity: 0,
        y: -80,
        ease: 'power2.out',
        duration: 0.3,
      },
      'start+=0' // Adjusted from 0.2 to reduce overlap
    );

    tl.addLabel('end');
  });

  return (
    <section className={styles.hero} ref={heroSectionRef}>
      <video
        autoPlay
        muted
        loop
        className={styles.video}
        ref={videoRef}
        preload="auto"
      >
        <source src="/videos/applevid.mp4" type="video/mp4" />
      </video>
      <div className={styles.content} ref={contentRef}>
        <h1 className={styles.heading}>
          All Apple Originals. <br />
          Only on Apple TV+.
        </h1>
        <button className={styles.button}>Stream Now</button>
        <p className={styles.subtext}>Watch on the 📺 app.</p>
      </div>
    </section>
  );
}
