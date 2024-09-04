/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      width: {
        '1/8': '12.5%', // Добавляем кастомную ширину 10%

      },
      padding: {
        '1.5': '6px', // Добавляем кастомное значение py-1.5
      },
    },

  },
  plugins: [],
}

