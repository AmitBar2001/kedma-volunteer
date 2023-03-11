/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#66347F",
        secondary: "#D27685",
        "midnight": "#001220"

      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
