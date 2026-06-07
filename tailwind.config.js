/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        detective: ['"Special Elite"', 'cursive'],
        serif: ['"Crimson Text"', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'game-bg': '#10131A',
        'game-mid': '#16213E',
        'game-surface': '#1F2937',
        'game-accent': '#F5A623',
        'game-text': '#E8E8E0',
        'game-danger': '#E05A47',
        'game-success': '#7ABF6A',
      },
    },
  },
  plugins: [],
};
