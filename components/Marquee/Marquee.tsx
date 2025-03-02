'use client';
import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
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
    <div
      className="relative flex flex-col gap-8 overflow-hidden -mt-24 p-24"
      id="next-section"
    >
      {/* First Marquee Row */}
      <div ref={marquee1Ref} className="flex gap-4 w-max will-change-transform">
        {[...images, ...images, ...images, ...images].map((img, i) => (
          <div
            key={`m1-${i}`}
            className="imageContainer flex-shrink-0 relative"
          >
            <Image
              src={img.src}
              alt=""
              width={img.width}
              height={img.height}
              className="rounded-xl w-[25vw] aspect-video object-cover transition-transform duration-300 hover:scale-[1.02]"
              priority={i < 4}
            />
          </div>
        ))}
      </div>

      {/* Second Marquee Row (Reversed) */}
      <div ref={marquee2Ref} className="flex gap-4 w-max will-change-transform">
        {[...images].reverse().map((img, i, arr) =>
          [...arr, ...arr, ...arr, ...arr].map((img, j) => (
            <div
              key={`m2-${j}`}
              className="imageContainer flex-shrink-0 relative"
            >
              <Image
                src={img.src}
                alt=""
                width={img.width}
                height={img.height}
                className="rounded-xl w-[25vw] aspect-video object-cover transition-transform duration-300 hover:scale-[1.02]"
                priority={j < 4}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
