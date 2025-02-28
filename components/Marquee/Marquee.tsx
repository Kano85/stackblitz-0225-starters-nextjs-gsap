// components/Marquee/Marquee.tsx
'use client';
import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import styles from './Marquee.module.scss';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

const images = [
  { src: '/images/image-4.jpg', width: 400, height: 225 },
  { src: '/images/image-2.jpg', width: 400, height: 225 },
  { src: '/images/img3.jpg', width: 400, height: 225 },
];

export default function Marquee() {
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const setupMarquee = (element: HTMLDivElement, speed: number) => {
      const content = element.querySelectorAll('.imageContainer');
      const gap =
        parseFloat(getComputedStyle(element).gap.replace('px', '')) || 0;
      const totalWidth = Array.from(content).reduce(
        (acc, el) => acc + el.clientWidth + gap,
        0
      );

      // Double the content for seamless looping
      gsap.set(element, { width: totalWidth * 2 });

      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: 'none' },
      });

      tl.to(element, {
        x: `-=${totalWidth + gap}`,
        duration: speed,
        modifiers: {
          x: (x) => {
            const xVal = parseFloat(x);
            return (xVal % (totalWidth + gap)) + 'px';
          },
        },
      });

      return tl;
    };

    const ctx = gsap.context(() => {
      if (marquee1Ref.current) {
        setupMarquee(marquee1Ref.current, 300);
      }
      if (marquee2Ref.current) {
        setupMarquee(marquee2Ref.current, 260);
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.marquee} id="next-section">
      <div ref={marquee1Ref} className={styles.marqueeInner}>
        {[...images, ...images, ...images, ...images].map((img, i) => (
          <div
            key={`m1-${i}`}
            className={`${styles.imageContainer} imageContainer`}
          >
            <Image
              src={img.src}
              alt=""
              width={img.width}
              height={img.height}
              className={styles.marqueeImage}
              priority={i < 4}
            />
          </div>
        ))}
      </div>
      <div ref={marquee2Ref} className={styles.marqueeInner}>
        {[...images].reverse().map((img, i, arr) =>
          [...arr, ...arr, ...arr, ...arr].map((img, j) => (
            <div
              key={`m2-${j}`}
              className={`${styles.imageContainer} imageContainer`}
            >
              <Image
                src={img.src}
                alt=""
                width={img.width}
                height={img.height}
                className={styles.marqueeImage}
                priority={j < 4}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
