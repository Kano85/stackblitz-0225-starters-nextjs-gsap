// components/Carousel/Carousel.tsx
'use client';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import Image from 'next/image';
import styles from './Carousel.module.scss';

const SLIDER_IMAGES = [
  { src: '/images/image-2.jpg', width: 800, height: 450 },
  { src: '/images/img3.jpg', width: 800, height: 450 },
  { src: '/images/image-4.jpg', width: 800, height: 450 },
];

export default function Carousel() {
  const slider1Ref = useRef<HTMLDivElement>(null);
  const slider2Ref = useRef<HTMLDivElement>(null);
  const slider3Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const setupScrollTrigger = () => {
      if (!slider1Ref.current || !slider2Ref.current || !slider3Ref.current)
        return;

      // Initial setup
      gsap.set(slider2Ref.current, {
        scale: 3.5,
        transformOrigin: 'center center',
      });

      gsap.set([slider1Ref.current, slider3Ref.current], {
        opacity: 0,
        x: 0,
      });

      // Scroll animation
      ScrollTrigger.create({
        trigger: slider2Ref.current,
        start: 'top 80%',
        end: 'top 80%',
        endTrigger: '#next-section',
        scrub: true,
        onUpdate: (self) => {
          const scale = gsap.utils.mapRange(0, 1, 3.5, 1, self.progress);

          gsap.set(slider2Ref.current, {
            scale: scale,
            overwrite: 'auto',
          });

          gsap.to([slider1Ref.current, slider3Ref.current], {
            opacity: self.progress,
            x: 0,
            ease: 'power2.out',
            overwrite: true,
          });
        },
        onRefresh: (self) => {
          gsap.set(slider2Ref.current, { scale: 3.5 });
          gsap.set([slider1Ref.current, slider3Ref.current], {
            opacity: 0,
            x: 0,
          });
        },
      });
    };

    setupScrollTrigger();
    return () => ScrollTrigger.killAll();
  }, []);

  return (
    <section className={styles.crouselWrapper}>
      <div className={styles.crousel}>
        <div className={styles.sliders}>
          <div
            ref={slider1Ref}
            className={`${styles.slider} ${styles.slider1}`}
          >
            <Image
              src={SLIDER_IMAGES[0].src}
              alt="Slider Image 1"
              width={800}
              height={450}
              className={styles.sliderImage}
              priority
              unoptimized
            />
          </div>
          <div
            ref={slider2Ref}
            className={`${styles.slider} ${styles.slider2}`}
          >
            <Image
              src={SLIDER_IMAGES[1].src}
              alt="Slider Image 2"
              width={800}
              height={450}
              className={styles.sliderImage}
              priority
              unoptimized
            />
          </div>
          <div
            ref={slider3Ref}
            className={`${styles.slider} ${styles.slider3}`}
          >
            <Image
              src={SLIDER_IMAGES[2].src}
              alt="Slider Image 3"
              width={800}
              height={450}
              className={styles.sliderImage}
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
