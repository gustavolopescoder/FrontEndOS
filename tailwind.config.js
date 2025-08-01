/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#1E293B", // azul padrão
        input: "#CBD5E1",
        botton: "#0F766E",
        text: "#FFFFFF",
        divs: "#F1F5F9",
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      lora: ["Lora", "serif"],
    },
  },
  plugins: [],
};
