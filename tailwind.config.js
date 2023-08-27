/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1E88E5',
        'secondary': '#FFC107',
      }
    },
  },
  plugins: [],
}

