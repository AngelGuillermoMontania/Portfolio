/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'header': '-7px 0px 50px -20px #16A34A',
        'headerDark': '-7px 0px 50px -20px #000000',
        'skills': '0 5px 30px -12px #FFFFFF',
      },
 /*      height: {
        '150': '150%'
      } */
    },
  },
  plugins: [],
}
