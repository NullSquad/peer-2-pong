import { Options } from "$fresh/plugins/twind.ts";

const customTwindClasses = {
  "rainfall": {
    "background-image": "url(/raindrops-animate.svg)",
  },
};

export default {
  selfURL: import.meta.url,
  plugins: customTwindClasses,
} as Options;
