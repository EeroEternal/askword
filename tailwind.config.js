/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./react/**/*.{js,jsx}", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
