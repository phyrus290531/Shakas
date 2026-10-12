/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        shaka: {
          bg: '#0D0D0D',
          card: '#0E0F10',
          input: '#2E3237',
          placeholder: '#B0B3B8',
          wine: '#781B1E',
          'wine-dark': '#5A1316',
        },
      },
      fontFamily: {
        medieval: ['MedievalSharp'],
      },
    },
  },
  plugins: [],
};
