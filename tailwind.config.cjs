module.exports = {
  // Use the class strategy so adding/removing the 'dark' class on <html>
  // will toggle dark styles (instead of relying on prefers-color-scheme media queries).
  darkMode: 'class',
  content: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.vue',
    './public/build/**/*.js',
    './public/build/**/*.css'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar')
  ]
};
