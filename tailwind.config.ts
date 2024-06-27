import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        "blue-dark": {
          extend: "dark",
          colors: {
            background: "#000000",
            foreground: "#ffffff",
            primary: {
              50: "#09346c",
              100: "#0f4b83",
              200: "#185fa2",
              300: "#2365c2",
              400: "#3178e2",
              500: "#62b3ed",
              600: "#82b0f6",
              700: "#ade2fc",
              800: "#d5ebfd",
              900: "#ecfcfe",
              DEFAULT: "#a3e4fe",
              foreground: "#ffffff",
            },
            danger: {
              900: "#5227278b",
              DEFAULT: "#ebadad",
            },
            success: {
              900: "#435b5187",
              DEFAULT: "#c8ebad",
            },
            focus: "#82c6f6",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
};
export default config;
