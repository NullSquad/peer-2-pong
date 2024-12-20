import { Background } from "./src/components/Background";

const plugin = require("tailwindcss/plugin");
const animations = require("@midudev/tailwind-animations");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Fugaz One", "sans-serif"],
        "lilita-one": ['"Lilita One"', "cursive"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        neutral: {
          DEFAULT: "#FFFFFF",
          grey: {
            50: "#F8F9FA",
            100: "#F1F3F5",
            200: "#E9ECEF",
            300: "#DEE2E6",
            400: "#CED4DA",
            DEFAULT: "#ADB5BD",
            600: "#868E96",
            700: "#495057",
            800: "#343A40",
            900: "#212529",
          },
          black: "#000000",
        },
        primary: {
          yellow: {
            50: "#FCEFB0",
            100: "#FFD81D",
            300: "#F8D83A",
            DEFAULT: "#F0C808",
            700: "#BC7D25",
            900: "#A6552D",
          },
        },
        accent: {
          blue: {
            light: "#1499ff",
            DEFAULT: "#0fa7fe",
            dark: "#0845dd",
            button: "#2373ff",
          },
          red: {
            light: "#f3605d",
            DEFAULT: "#eb5151",
            dark: "#b41642",
            button: "#e1362f",
          },
        },
      },
      backgroundImage: {
        league: "url('./src/assets/league.svg')",
        tournament: "url('./src/assets/tournament.svg')",
        pattern: "url('./src/assets/block.svg')",
      },
    },
  },
  plugins: [
    animations,
    plugin(function ({ addBase, addComponents, matchComponents, theme }) {
      addBase({
        h1: { fontSize: "2.5rem", textShadow: "1px 1px 2px black" },
        h2: { fontSize: "2rem", textShadow: "1px 1px 2px black" },
        h3: { fontSize: "1.75rem", textShadow: "1px 1px 2px black" },
        h4: { fontSize: "1.5rem", textShadow: "1px 1px 2px black" },
        h5: { fontSize: "1.25rem", textShadow: "1px 1px 2px black" },
        h6: { fontSize: "1rem", textShadow: "1px 1px 2px black" },
      });
      addComponents({
        ".shadow-yellow-50-700": {
          boxShadow: `inset 0 .2em ${theme("colors.primary.yellow.50")}, inset 0 -.2em ${theme("colors.primary.yellow.700")}`, // 0.3rem -> 0.2rem
        },
        ".shadow-yellow-50-700-sm": {
          boxShadow: `inset 0 .1em ${theme("colors.primary.yellow.50")}, inset 0 -.1em ${theme("colors.primary.yellow.700")}`,
        },
        ".shadow-yellow-50-700-bot": {
          boxShadow: `inset 0 -.2em ${theme("colors.primary.yellow.700")}`,
        },
        ".shadow-yellow-50-700-bot-sm": {
          boxShadow: `inset 0 .1em ${theme("colors.primary.yellow.50")}, inset 0 -.1em ${theme("colors.primary.yellow.700")}`,
        },
        ".shadow-yellow-100-700": {
          boxShadow: `inset 0 .5em ${theme("colors.primary.yellow.100")}, inset 0 -.5em ${theme("colors.primary.yellow.700")}`,
        },
        ".shadow-blue": {
          boxShadow: `inset 0 .15em ${theme("colors.accent.blue.light")}, inset 0 -.15em ${theme("colors.accent.blue.dark")}`,
        },
        ".shadow-red": {
          boxShadow: `inset 0 .15em ${theme("colors.accent.red.light")}, inset 0 -.15em ${theme("colors.accent.red.dark")}`,
        },
        ".parallelogram": {
          clipPath: "polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)",
        },
        ".parallelogram-tuta": {
          clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0% 100%)",
        },
        ".parallelogram-banner": {
          clipPath: "polygon(0% 0, 100% 0, 92% 100%, 0% 100%)",
        },
      });
    }),
  ],
};
