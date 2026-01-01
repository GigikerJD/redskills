// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class', // Active le mode dark avec la classe
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config