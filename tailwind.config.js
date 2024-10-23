/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        'body-bg': '#fff',
        'primary-color': '#000',
        'secondary-color': 'gold'
      },
    },
  },
  plugins: [],
}

