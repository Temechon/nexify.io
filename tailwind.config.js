module.exports = {
  mode: 'jit',
  purge: {
    enabled: true,
    content: [
      './src/**/*.{html,ts,scss}',
    ],
    safelist: [
      'bg-red-400',
      'hover:bg-red-700',
      'bg-indigo-400',
      'bg-indigo-50',
      'bg-mydarkblue-300',
      'w-1/2',
      'active:bg-red-500',
      'h-20',
      'disabled:bg-gray-600',
      'disabled:cursor-not-allowed',
      'dark:bg-gray-300',
      'dark:text-gray-900',
      'dark:hover:bg-red-500'
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
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
        'myblue': "#0095ff",
        "darkmode-800": "#141519",
        "darkmode-700": "#1b1c22",
        "darkmode-600": "#24262e",
        "darkmode-500": "#282c33",
        "darkmode-400": "#333841",
        "darkmode-300": "#4a515e",

      },
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
        display: ['Jost', 'sans-serif']
      },

      height: {
        "100": '450px'
      },

      animation: {
        'spin-fast': 'spin 0.35s linear infinite',
      },
      typography(theme) {
        return {
          dark: {
            css: {
              color: theme("colors.gray.300"),
              '[class~="lead"]': { color: theme("colors.gray.400") },
              a: { color: theme("colors.gray.100") },
              strong: { color: theme("colors.gray.100") },
              "ul > li::before": { backgroundColor: theme("colors.gray.700") },
              hr: { borderColor: theme("colors.gray.800") },
              blockquote: {
                color: theme("colors.gray.100"),
                borderLeftColor: theme("colors.gray.800"),
              },
              h1: { color: theme("colors.gray.100") },
              h2: { color: theme("colors.gray.100") },
              h3: { color: theme("colors.gray.100") },
              h4: { color: theme("colors.gray.100") },
              code: { color: theme("colors.gray.100") },
              "a code": { color: theme("colors.gray.100") },
              pre: {
                color: theme("colors.gray.200"),
                backgroundColor: theme("colors.gray.800"),
              },
              thead: {
                color: theme("colors.gray.100"),
                borderBottomColor: theme("colors.gray.700"),
              },
              "tbody tr": { borderBottomColor: theme("colors.gray.800") },
            },
          },
        };
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled', 'active'],
      cursor: ['disabled']
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
