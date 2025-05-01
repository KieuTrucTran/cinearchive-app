/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          text: {
            DEFAULT: "#000000",
            50: "rgba(0, 0, 0, 0.5)",
          },
          accent: {
            DEFAULT: "#86443D",
            80: "rgba(134, 68, 61, 0.8)",
          },
          background: "#EDE8DF",
          accentBackground: "#E2DED7",
        },
        dark: {
          text: {
            DEFAULT: "#FFFFFF",
            50: "rgba(255, 255, 255, 0.5)",
          },
          accent: {
            DEFAULT: "#FFC25F",
            80: "rgba(255, 194, 95, 0.8)",
          },
          background: "#424C55",
          accentBackground: "#38424B",
        },
      },
      fontFamily: {
        title: ["Playfair Display", "serif"],
        text: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
