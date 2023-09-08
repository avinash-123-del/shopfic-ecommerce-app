/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'lilita': ['Courgette', 'sans-serif'],
        'exo': ['Aclonica', 'sans-serif'],
 
      },
      keyframes:{
        leftRight: {
          '0%':{transform:'translateX(-10%)'},
          '50%':{transform:'translateX(25%)'},
          '100%':{transform:'translateX(-10%)'},
        },
        trolly: {
          '0%':{transform:'translateX(-50%)'},
          '50%':{transform:'translateX(25%)'},
          '100%':{transform:'translateX(100%)'},
        }
      },
      animation: {
        leftRight : 'leftRight 2s ease-in-out infinite',
        trolly : 'trolly 10s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}