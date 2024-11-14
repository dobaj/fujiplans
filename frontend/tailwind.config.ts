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
        "theme-bg-green": "#E0E1CB",
        "theme-grad-red": "#AE4747",
        "theme-grad-green": "#ACA477",
        "theme-stroke-red": "#CF7D7D",
        "theme-fill-red": "#D9918D"
      },
      fontFamily: {
        PJS: ["Plus Jakarta Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
};
export default config;
