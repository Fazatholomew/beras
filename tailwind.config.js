/** @type {import('tailwindcss').Config} */
export default {
  plugins: [],
  theme: {
    extend: {},
  },
  content: ["./index.html", './src/**/*.{svelte,js,ts}'], //for unused css
  variants: {
    extend: {},
  },
  darkmode: true, // or 'media' or 'class'
}