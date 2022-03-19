module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        pulse: "wiggle 3s linear infinite",
        slidein: "slidein 0.5s linear",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        slidein: {
          "0%": {
            opacity: 0,
            transform: "translateX(-300px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateX(0px)",
          },
        },
      },
    },
  },
  plugins: [],
};
