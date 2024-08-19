/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ['Comfortaa', 'cursive'],
        josefin: ['Josefin Sans', 'sans-serif'],
        kalnia: ['Kalnia Glaze', 'sans-serif'],
        marker: ['Permanent Marker', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'background': "url('./assets/images/backgr.jpg')",
      },
    },
  },
  plugins: [],
}