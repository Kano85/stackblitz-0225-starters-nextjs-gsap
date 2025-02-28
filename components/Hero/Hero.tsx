'use client';

import { useEffect, useRef } from 'react';
import styles from './Hero.module.scss';

export default function Hero() {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroSectionRef.current) return;
      // Get the bounding rectangle of the hero section
      const rect = heroSectionRef.current.getBoundingClientRect();
      // Calculate scroll progress (0 when the section is fully in view, 1 when it's off-screen)
      const progress = Math.min(
        Math.max((window.innerHeight - rect.top) / window.innerHeight, 0),
        1
      );

      if (videoRef.current) {
        videoRef.current.style.opacity = String(1 - progress);
      }

      if (contentRef.current) {
        contentRef.current.style.opacity = String(1 - progress);
        contentRef.current.style.transform = `translateY(-${progress * 80}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Call initially in case the page isn't at the top
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className={styles.hero} ref={heroSectionRef}>
      <video autoPlay muted loop className={styles.video} ref={videoRef}>
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
