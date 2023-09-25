/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.tsx'], // またはjsx, ts, jsなどの拡張子に応じて変更
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  content: [
    './stories/**/*.{js,ts,jsx,tsx}',
  ]
}
