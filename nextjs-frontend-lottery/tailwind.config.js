/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slide: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(100%,0,0)" },
        },
      },
      animation: {
        slide: "slide 10s  linear infinite",
      },
    },
  },
  plugins: [],
};
