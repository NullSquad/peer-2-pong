import { Options } from "$fresh/plugins/twind.ts";

const customTwindClasses = {
  "rainfall": {
    "background-image": "url(/raindrops-animate.svg)",
  },
};

export default {
  selfURL: import.meta.url,
  plugins: customTwindClasses,
  theme: {
    colors: {
      background: "#282A36",
      currentLine : "#44475A",
      foreground: "#F8F8F2",
      comment: "#6272A4",
      cyan: "#8BE9FD",
      green: "#50FA7B",
      orange: "#FFB86C",
      pink: "#FF79C6",
      purple: "#BD93F9",
      red: "#FF5555",
      yellow: "#F1FA8C",
    },
  },
} as Options;
