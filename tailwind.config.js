/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#00C8FF",
          green: "#10B981",
          dark: "#0F172A",
          card: "#1E293B",
        }
      }
    },
  },
  plugins: [],
}
