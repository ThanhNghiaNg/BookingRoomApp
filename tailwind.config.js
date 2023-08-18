/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#1b1b1b",
        light: "#f5f5f5",
        primary: "#F43F5E",
        //primaryDark: "#58E6D9",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["winter"],
  },
};
