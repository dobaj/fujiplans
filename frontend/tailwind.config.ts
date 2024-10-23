import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "theme-green": "#9BAF6D",
        "theme-bg-green": "#E0E1CB"
      },
      fontFamily: {
        PJS: ["Plus Jakarta Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
};
export default config;
