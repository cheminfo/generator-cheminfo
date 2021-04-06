module.exports = {
  // Optional: use zakodium's tailwind css preset
  // npm i -D @zakodium/tailwind-config
  // presets: [
  //   require('@zakodium/tailwind-config'),
  // ],
  theme: {
    extend: {},
  },
  purge: ['./src/**/*.jsx', './src/**/*.js', './public/index.html'],
};
