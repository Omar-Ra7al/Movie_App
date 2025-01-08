import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // إضافة الوضع الداكن باستخدام الكلاس
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        main: "var(--main-color)",
        secondary: "var(--sec-color)",
        active: "var(--active-color)",
      },
    },
  },
  plugins: [],
} satisfies Config;
