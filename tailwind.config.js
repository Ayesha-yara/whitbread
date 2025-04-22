/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'premier-purple': '#5C2D91',
        'premier-purple-dark': '#4A2275',
        'premier-purple-light': '#7E57A4',
        'premier-blue': '#00224F',
        'premier-blue-dark': '#001A3C',
        'premier-blue-light': '#003366',
      },
      backgroundColor: {
        'light': 'var(--background)',
        'dark': 'var(--background)',
      },
      textColor: {
        'light': 'var(--foreground)',
        'dark': 'var(--foreground)',
      },
    },
  },
  plugins: [],
  safelist: [
    'dark',
    'light',
    'dark:bg-gray-800',
    'dark:bg-gray-900',
    'dark:text-white',
    'dark:text-gray-200',
    'dark:text-gray-300',
    'dark:border-gray-600'
  ]
}
