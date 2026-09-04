/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        rail: {
          50: '#eef4ff',
          100: '#dbe7fe',
          200: '#bfd6fe',
          300: '#93bcfd',
          400: '#5f97fa',
          500: '#3b74f5',
          600: '#2554e8',
          700: '#1d40d4',
          800: '#1e35ab',
          900: '#1e2f87',
          950: '#161d52',
        },
        onTime: '#1a9e5c',
        minorDelay: '#e08a1e',
        majorDelay: '#d8352f',
        demo: '#7c4fd8',
        seasonal: '#0e8f8a',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 24, 55, 0.06), 0 1px 12px rgba(16, 24, 55, 0.05)',
      },
    },
  },
  plugins: [],
}
