import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: "#2F2FE4",
          200: "#162E93",
          300: "#1A1953",
          400: "#080616"
        }
      },
      boxShadow: {
        soft: "0 20px 45px -28px rgba(8, 6, 22, 0.6)"
      }
    }
  },
  plugins: []
};

export default config;
