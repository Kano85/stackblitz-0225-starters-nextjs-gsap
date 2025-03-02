//tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}', // Add if you have utility folders
  ],
  theme: {
    extend: {
      colors: {
        bg: '#ff5733',
        light: '#fff',
        dark: '#0e100f',
        muted: '#a1a1a6',
        link: '#2997ff',
      },
      spacing: {
        header: '4rem',
        xs: '0.8rem',
        sm: '1.6rem',
        md: '2.4rem',
        lg: '3.2rem',
        xl: '4.8rem',
      },
      fontFamily: {
        body: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        heading: ['Mori', 'sans-serif'],
      },
      transitionDuration: {
        base: '300ms',
      },
      screens: {
        mobile: '720px',
      },
      // New extensions for component requirements
      zIndex: {
        '4': '4',
        '5': '5',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      willChange: {
        opacity: 'opacity',
        transform: 'transform',
        'transform-opacity': 'transform, opacity',
        'filter-transform': 'filter, transform',
      },
    },
  },
  plugins: [],
  // Safelist for dynamic classes used in components
  safelist: [
    'transform-style-preserve-3d',
    'will-change-opacity',
    'will-change-transform',
    'will-change-transform-opacity',
    'will-change-filter-transform',
    'z-[4]',
    'z-[5]',
    'bg-bg',
    'text-light',
    'text-muted',
  ],
};

export default config;
