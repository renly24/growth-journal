import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          200: 'var(--color-pastel-pink-200)',
          400: 'var(--color-pastel-pink-400)',
          500: 'var(--color-pastel-pink-500)',
        },
        purple: {
          200: 'var(--color-pastel-purple-200)',
          500: 'var(--color-pastel-purple-500)',
          600: 'var(--color-pastel-purple-600)',
          800: 'var(--color-pastel-purple-800)',
        },
        blue: {
          200: 'var(--color-pastel-blue-200)',
          600: 'var(--color-pastel-blue-600)',
        },
        yellow: {
          500: 'var(--color-pastel-yellow-500)',
        },
        green: {
          500: 'var(--color-pastel-green-500)',
        },
        gray: {
          200: '#e5e7eb',
          400: '#9ca3af',
          500: 'var(--color-pastel-gray-500)',
          800: 'var(--color-pastel-gray-800)',
        },
      },
    },
  },
  plugins: [],
};

export default config; 