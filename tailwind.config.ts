import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          yellow: "#D5AF34",
          black: "#000000",
          DEFAULT: "#D5AF34",
        },
        secondary: {
          lightGrey: "#E0E0E0",
          darkGrey: "#6D6D6D",
          beigeSable: "#E6D5B8",
          mutedTeal: "#5F9EA0",
        },
      },
      fontFamily: {
        primary: ["var(--font-swis721-hv)", "sans-serif"],
        secondary: ["var(--font-swis721)", "sans-serif"],
      },
      backgroundColor: {
        'primary-yellow': '#D5AF34',
        'primary-black': '#000000',
        'secondary-lightGrey': '#E0E0E0',
        'secondary-darkGrey': '#6D6D6D',
        'secondary-beigeSable': '#E6D5B8',
        'secondary-mutedTeal': '#5F9EA0',
      },
      textColor: {
        'primary-yellow': '#D5AF34',
        'primary-black': '#000000',
        'secondary-lightGrey': '#E0E0E0',
        'secondary-darkGrey': '#6D6D6D',
        'secondary-beigeSable': '#E6D5B8',
        'secondary-mutedTeal': '#5F9EA0',
      },
      borderColor: {
        'primary-yellow': '#D5AF34',
        'primary-black': '#000000',
        'secondary-lightGrey': '#E0E0E0',
        'secondary-darkGrey': '#6D6D6D',
        'secondary-beigeSable': '#E6D5B8',
        'secondary-mutedTeal': '#5F9EA0',
      },
    },
  },
  plugins: [],
};

export default config;
