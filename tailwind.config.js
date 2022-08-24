module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      colors: {
        grayf1: "#F1F1F3",
        primary: "#1DC071",
        secondary: "#A4D96C",
      },
      boxShadow: {
        custome: "0 -4px 32px rgb(0 0 0 / 20%);",
      },
      height: {
        header: "32rem",
      },
      animation: {
        skeleton: "skeleton 1s linear infinite alternate",
      },
      keyframes: {
        skeleton: {
          "0%": { backgroundColor: "hsl(200, 20%, 80%)" },
          "100%": { backgroundColor: "hsl(200, 20%, 95%)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
