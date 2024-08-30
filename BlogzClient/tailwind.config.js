/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      // Custom breakpoints
      screens: {
      'sm': {'min': '400px', 'max': '768px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '768px', 'max': '1023px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '1024px', 'max': '1319px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1320px', 'max': '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': {'min': '1536px'},
      // => @media (min-width: 1536px) { ... }
    },
      // Custom spacing, font sizes, etc. can be added here
      spacing: {
        '72': '18rem',  // Example custom spacing
        '84': '21rem',
        '96': '24rem',
      },
      fontSize: {
        'xs': '0.75rem',  // Example custom font sizes
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
      },
      // Custom colors can be added here
      colors: {
        'primary': '#1D4ED8', // Example custom color
        'secondary': '#3B82F6',
        'accent': '#9333EA',
        'background': '#F3F4F6',
      }
    },
  },
  plugins: [],
}
