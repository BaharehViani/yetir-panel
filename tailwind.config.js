/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#568aff',
        secondary: '#8fd14f',
        basic: '#ffffff',
      },
    },
    fontSize: {
      // Custom font sizes
      xxs: '0.625rem', // 10px
      xl: '1.2rem',
      xxl: '2rem',
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
      '6xl': '4rem', // 64px
      '7xl': '5rem', // 80px
      '8xl': '6rem', // 96px
      '9xl': '8rem',
    },
  },
  plugins: [],
}
