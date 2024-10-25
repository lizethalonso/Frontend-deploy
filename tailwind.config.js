/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EFB810",
        secondary: "#BD9006",
        tertiary: "FFD557",
        background: "#000000",
        },
    },
  },
  plugins: [],
}