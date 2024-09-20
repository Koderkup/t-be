/** @type {import('tailwindcss').Config} */
import { type Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      main_black: 'var(--main-black)',
      white: 'var(--white)',
      black: 'var(--black)',
      black_40: 'var(--black-40)',
      black_60: 'var(--black-60)',
      black_100: 'var(--black-100)',
      grey_20: 'var(--grey-20)',
      grey_100: 'var(--grey-100)',
      grey_200: 'var(--grey-200)',
      blue: 'var(--blue)',
      error: 'var(--error)',
    },
    extend: {
      fontFamily: {
        primary: ['SF Pro Text', 'sans-serif'],
        secondary: ['Source Serif', 'sans-serif'],
      },
      borderColor: {
        cartActions: 'rgba(60, 60, 67, 0.36)',
      },
    },
  },
  plugins: [],
} satisfies Config;
