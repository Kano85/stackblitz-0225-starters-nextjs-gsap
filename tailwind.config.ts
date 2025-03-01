// tailwind.config.ts
import type { Config } from 'tailwindcss';
import containerQueries from '@tailwindcss/container-queries';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-color)',
        foreground: 'var(--light)',
        border: 'var(--text-muted)',
        primary: 'var(--bg-color)',
      },
      spacing: {
        xs: '0.8rem',
        sm: '1.6rem',
        md: '2.4rem',
        lg: '3.2rem',
        xl: '4.8rem',
      },
    },
  },
  plugins: [containerQueries],
};

export default config;
