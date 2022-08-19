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
            colors: {
                'greenPrimary': '#16A34A',
                'blackPrimary': '#1E1E1E',
                'blackSecundary': '#2A2A2A',
            },
            fontFamily: {
                Acme: 'Acme'
            }
        },
    },
    plugins: [],
}
