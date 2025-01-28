//const { addDynamicIconSelectors } = require("@iconify/tailwind");

const { addIconSelectors } = require('@iconify/tailwind');
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    extend: {},
  },
  plugins: [
    //addDynamicIconSelectors()
    addIconSelectors(['mdi', 'mdi-light']),
  ],
}

