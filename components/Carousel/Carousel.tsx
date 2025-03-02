'use client';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import Image from 'next/image';

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

      gsap.set(slider2Ref.current, {
        scale: 3.5,
        transformOrigin: 'center center',
      });

      gsap.set([slider1Ref.current, slider3Ref.current], {
        opacity: 0,
        x: 0,
      });

      ScrollTrigger.create({
        trigger: slider2Ref.current,
        start: 'top 80%',
        end: 'top 80%',
        endTrigger: '#next-section',
        scrub: true,
        onUpdate: (self) => {
          const scale = gsap.utils.mapRange(0, 1, 3.5, 1, self.progress);
          gsap.set(slider2Ref.current, { scale });
          gsap.to([slider1Ref.current, slider3Ref.current], {
            opacity: self.progress,
            x: 0,
            ease: 'power2.out',
          });
        },
        onRefresh: () => {
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
    <section className="h-[130vh] relative w-full overflow-hidden">
      <div className="sticky top-0 mt-[30vh] h-screen flex items-center justify-center">
        <div className="flex gap-4 py-4 h-screen items-center justify-center w-full">
          {/* Slider 1 */}
          <div
            ref={slider1Ref}
            className="flex-shrink-0 rounded-xl overflow-hidden z-[1]"
          >
            <Image
              src={SLIDER_IMAGES[0].src}
              alt="Slider Image 1"
              width={800}
              height={450}
              className="w-[66vw] aspect-video object-cover block"
              priority
              unoptimized
            />
          </div>

          {/* Slider 2 */}
          <div
            ref={slider2Ref}
            className="flex-shrink-0 rounded-xl overflow-hidden z-[2]"
          >
            <Image
              src={SLIDER_IMAGES[1].src}
              alt="Slider Image 2"
              width={800}
              height={450}
              className="w-[66vw] aspect-video object-cover block"
              priority
              unoptimized
            />
          </div>

          {/* Slider 3 */}
          <div
            ref={slider3Ref}
            className="flex-shrink-0 rounded-xl overflow-hidden z-[1]"
          >
            <Image
              src={SLIDER_IMAGES[2].src}
              alt="Slider Image 3"
              width={800}
              height={450}
              className="w-[66vw] aspect-video object-cover block"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
