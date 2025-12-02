// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./inertia/app/**/*.{tsx,jsx,ts,js}",
    "./resources/views/**/*.edge",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
}