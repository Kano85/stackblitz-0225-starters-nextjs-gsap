// components/Pricing/Pricing.tsx

'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import styles from './Pricing.module.scss';

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
          delay: i * 0.2, // stagger animations a bit
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
    <section className={styles.pricing} ref={containerRef}>
      <h2 className={styles.heading}>Apple TV+ Plans</h2>
      <div className={styles.cardsWrapper}>
        {PRICING_CARDS.map((card, index) => (
          <div
            key={index}
            ref={(el) => el && (cardsRef.current[index] = el)}
            className={styles.card}
          >
            <h3 className={styles.title}>{card.title}</h3>
            <p className={styles.subtitle}>{card.subtitle}</p>
            <p className={styles.text}>{card.text}</p>
            <button className={styles.button}>{card.button}</button>
          </div>
        ))}
      </div>
    </section>
  );
}
