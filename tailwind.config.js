module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
      },
    },
    extend: {
      colors: {
        blue: "var(--blue)",
        lightBg: "var(--light-bg)",
      },
    },
  },
  // plugins: [require("@tailwindcss/forms")],
};
