'use strict';

const cssnano = require('cssnano')({
  preset: 'default',
});

module.exports = {
  plugins: [
    require('tailwindcss')(`./styles/tailwind.config.js`),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [cssnano] : []),
  ],
};
