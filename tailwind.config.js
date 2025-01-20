/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#323437',
          secondary: '#2C2E31',
          icon: '#646669',
          hover: '#D1D0C5',
          active: '#E2B714',
          danger: '#CA4754',
          unfocused: 'rgb(25,26,27,0.5)',
          footerText: 'white'
        },
        light: {
          primary: '#F5F5F5',
          secondary: '#E8E8E8',
          icon: '#7A7A7A',
          hover: '#D1D0C5',
          active: '#E2B714',
          danger: '#CA4754',
          unfocused: 'rgba(220,220,220,0.5)',
          footerText: 'black'
        }
        
      }
    },
    keyframes: {
      fade: {
        '0%, 100%': {opacity: 1},
        '50%': {opacity: 0}
      }
    },
    animation: {
      fade: 'fade 1s infinite'
    }
  },
  plugins: [],
}

