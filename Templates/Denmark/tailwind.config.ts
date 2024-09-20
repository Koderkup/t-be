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
      black_90: 'var(--black-90)',
      black_70: 'var(--black-70)',
      black_50: 'var(--black-50)',
      black_30: 'var(--black-30)',
      black_10: 'var(--black-10)',
      black_05: 'var(--black-05)',
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
        third: ['FreightBigProBook-Regular', 'sans-serif'],
        fourth: ['FreightBigProLight-Regular', 'sans-serif'],
      },
      borderColor: {
        cartActions: 'rgba(60, 60, 67, 0.36)',
      },
    },
  },
  plugins: [],
} satisfies Config;
