module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'google-gray': '#dadce0',
      }
    }
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: ['lofi'],
  },
};