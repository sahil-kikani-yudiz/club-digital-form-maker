import type { Config } from 'tailwindcss'
import { colors } from './shared/constants/colors'

const breakpoints = ['', 'lg', 'md', 'sm', 'xxl', 'xl']

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './assets/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/*.{js,ts,jsx,tsx,mdx}'
  ],
  safelist: [
    'max-w-[500px]',
    'max-w-[1150px]',
    'max-w-[1200px]',
    'max-w-[1400px]',
    'bg-orange-700',
    'bg-primary-400',
    'bg-teal-500',
    'bg-yellow-500',
    'bg-violet-500'
   ],  
  darkMode: ["class"],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1440px'
    },
    extend: {
      animation:{
        'pulse' : 'pulse 1s ease-in-out 2',
      },
      colors: {
        theme: '#FFFFFF',
        background: '#F4F4F4',
        primary: {
          100: '#e7f0ff',
          200: '#ECF1FF',
          300: '#5090f6',
          400: '#045de9',
          500: '#2764FF',
          600: '#174a9c',
          700: '#0e3778',
          800: '#253459',
          900: '#0c264f'
        },
        secondary: {
          100: '#f2f4f7',
          200: '#e4e6eb',
          300: '#d2d5d9',
          400: '#a7acb4',
          500: '#757982',
          600: '#50545d',
          700: '#323842',
          800: '#23272e',
          900: '#000000'
        },
        dark: {
          100: '#101935',
          200: '#212c4c',
          300: '#101935',
          400: '#3C415C',
          500: '#1A2F4B',
          600: '#858585',
          700: '#8b8890'
        },
        firstGradient: {
          from: '#f2f4f7',
          to: '#d2d5d9'
        },
        tableBg: '#E0E2E7'
      }
    }
  },
  plugins: []
}
export default config
