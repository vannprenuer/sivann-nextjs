/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#2e353e',      // Porto dark navy — headings/body text
        gold: '#ffd93e',     // Porto primary accent
        panel: '#1f242b',
        bg1: '#ecf1f7',      // Porto light section background (About links strip)
        bg2: '#f4f9ff',      // Porto pale section background (Education)
        muted: '#b7b7b7',
        purple: '#8224e3',   // Porto blog section accent button color
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};
