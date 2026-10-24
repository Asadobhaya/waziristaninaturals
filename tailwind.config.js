/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#07160F',
          900: '#0F291E',
          800: '#173D2D',
          700: '#20523C',
          600: '#2A684C',
        },
        olive: {
          900: '#2D3522',
          800: '#3D482E',
          700: '#4E5C3B',
          600: '#5F7047',
          500: '#758A59',
          100: '#EDF1E7',
          50: '#F5F7F2',
        },
        gold: {
          600: '#9C7A35',
          500: '#B89242',
          400: '#C9A354',
          300: '#DBB96E',
          200: '#ECCF8D',
          100: '#F5E7C4',
        },
        ivory: {
          900: '#D5CEC0',
          800: '#E4DDD0',
          100: '#F6F3EC',
          50: '#FAF8F4',
        },
        charcoal: {
          900: '#141816',
          800: '#212623',
          700: '#343B36',
          600: '#525B54',
          400: '#8A938C',
          200: '#D1D7D2',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Cinzel', 'Georgia', 'serif'],
        urdu: ['Noto Nastaliq Urdu', 'Urdu Typesetting', 'Jameel Noori Nastaleeq', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
