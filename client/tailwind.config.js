 /** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // blue-600
        secondary: '#fbbf24', // yellow-400
        accent: '#10b981', // emerald-500
        background: '#f3f4f6', // gray-100
        surface: '#fff',
        text: '#1e293b', // slate-800
        muted: '#64748b', // slate-400
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};