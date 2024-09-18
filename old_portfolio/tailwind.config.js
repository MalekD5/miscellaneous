/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       primary: '#111927',
       secondary: '#79AEA3',
       accent: '#9fef00'
      }
    },
  },
  plugins: [],
}
