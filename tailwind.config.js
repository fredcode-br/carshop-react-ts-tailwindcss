/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        dark: {
          100: '#000000',
          200: '#000000',
          300: '#000000'
        },
        ligth: {
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF'
        }
      },
      height: {
        '100': '30rem',
      }
    },
  },
  plugins: [],
}

