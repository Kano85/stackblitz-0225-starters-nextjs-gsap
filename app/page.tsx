// app/page.tsx
import Hero from '@/components/Hero/Hero';
import USP from '@/components/USP/USP';
import Pricing from '@/components/Pricing/Pricing';
import Carousel from '@/components/Carousel/Carousel';
import Marquee from '@/components/Marquee/Marquee';

export default function Home() {
  return (
    <main>
      <Hero />
      <USP />
      <Pricing />
      <Carousel />
      <Marquee />
      <section className="next-section" id="next-section"></section>
    </main>
  );
}
