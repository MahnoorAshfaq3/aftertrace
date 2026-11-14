export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { space: { 950: '#040816', 900: '#070d24', 800: '#0c1636' }, mars: { 400: '#f59e4b', 500: '#e8793a', 600: '#c4532a' }, glow: '#39b8ff' },
      fontFamily: { display: ['Orbitron', 'Rajdhani', 'system-ui', 'sans-serif'], body: ['Rajdhani', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}
