/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./docs/.vitepress/**/*.{js,ts,vue,md}",
    "./docs/**/*.md",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
