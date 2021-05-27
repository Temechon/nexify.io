module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'mygray': '#edf1f7',
        'mydarkgray-500': '#2D2D2D',
        'mydarkblue-500': '#2d3f51',
        'mydarkblue-300': '#3c546b',
        'mydarkblue-200': '#45617c',
        'mygreen': "#00d68f",
        'myorange': "#ffaa00",
        'myred': "#ff3d71",
        'myblue': "#0095ff"
      },
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
        display: ['Jost', 'sans-serif']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
