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
        gold: {
          50: '#f9f7f1',
          100: '#f3eee2',
          200: '#e8b047',
          300: '#d49b3f',
          400: '#c9a961',
          500: '#b89649',
          600: '#a68241',
          700: '#8a6934',
          800: '#6e5527',
          900: '#52411a',
        },
        dark: {
          50: '#f7f7f7',
          100: '#f0f0f0',
          200: '#d9d9d9',
          300: '#c2c2c2',
          400: '#a4a4a4',
          500: '#808080',
          600: '#5a5a5a',
          700: '#373737',
          800: '#1a1a1a',
          900: '#0d0d0d',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Source Sans Pro', 'Arial', 'sans-serif'],
        accent: ['Montserrat', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
export default config;
