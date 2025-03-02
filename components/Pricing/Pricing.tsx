'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type PricingCard = {
  title: string;
  subtitle: string;
  text: string;
  button: string;
};

const PRICING_CARDS: PricingCard[] = [
  {
    title: '3 Months Free',
    subtitle: 'Buy an Apple device',
    text: 'Apple TV+ is included for 3 months when you purchase an Apple device and redeem the offer within 90 days. Enjoy exclusive content on all your screens.',
    button: 'Check Eligibility',
  },
  {
    title: 'Monthly Plan',
    subtitle: '$6.99/mo after free trial',
    text: 'Sign up for Apple TV+ on your existing devices. Cancel anytime. Share with your family. Watch in the TV app, on multiple platforms.',
    button: 'Subscribe Now',
  },
  {
    title: 'Apple One',
    subtitle: 'Bundle & Save',
    text: 'Get Apple TV+, Apple Music, Apple Arcade, and iCloud+ for one low monthly price. Save money across all your Apple services.',
    button: 'Learn More',
  },
];

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'top top',
            toggleActions: 'play pause play reverse',
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      className="w-full bg-bg py-lg relative z-[5] max-md:py-md"
      ref={containerRef}
    >
      <h2
        className="text-light text-center mb-md max-md:mb-sm"
        style={{ fontSize: 'clamp(3rem, 5vw, 5rem)' }}
      >
        Apple TV+ Plans
      </h2>

      <div className="flex flex-wrap justify-center gap-lg max-md:flex-col max-md:items-center">
        {PRICING_CARDS.map((card, index) => (
          <div
            key={index}
            ref={(el) => el && (cardsRef.current[index] = el)}
            className="flex-1 bg-light/10 rounded-[2rem] p-lg backdrop-blur-lg text-left flex flex-col justify-between min-w-[30rem] max-w-[38rem] max-md:max-w-[90%]"
          >
            <h3
              className="text-light mb-sm"
              style={{ fontSize: 'clamp(2rem, 2.5vw, 3rem)' }}
            >
              {card.title}
            </h3>

            <p className="text-light/80 text-[1.8rem] mb-sm">{card.subtitle}</p>

            <p className="text-muted leading-[1.4] text-[1.6rem]">
              {card.text}
            </p>

            <button className="btn-primary mt-md">{card.button}</button>
          </div>
        ))}
      </div>
    </section>
  );
}
