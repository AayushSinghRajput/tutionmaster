/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f8f0f4",
          100: "#f3e6ec",
          200: "#e4c7d3",
          300: "#cf9fb3",
          400: "#a8577c",
          500: "#8a3861",
          600: "#6e2a46",
          700: "#551f37",
          800: "#42182b",
          900: "#301220",
        },
        gold: {
          50: "#faf5e9",
          100: "#f6ecd6",
          200: "#e5cd97",
          300: "#d9b76a",
          400: "#cc9f47",
          500: "#bd8a2e",
          600: "#a3762a",
          700: "#836022",
          800: "#634a1a",
          900: "#453412",
        },
        success: {
          50: "#eaf5ef",
          100: "#e7f1ec",
          200: "#bcdccb",
          500: "#2f7a5e",
          600: "#276650",
          700: "#1f5240",
        },
        stone: {
          50: "#fbfaf7",
          100: "#f1eee9",
          200: "#e2dcd2",
          300: "#cfc7b9",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Iowan Old Style", "Palatino Linotype", "Book Antiqua", "serif"],
      },
    },
  },
  plugins: [],
}