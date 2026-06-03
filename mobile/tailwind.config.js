/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#3B348B",
        "primary-dark": "#2E2870",
        "gray-bg": "#F5F6FA",
        "text-dark": "#111827",
        "text-muted": "#6B7280",
        "input-border": "#E5E7EB",
      },
      fontFamily: {
        inter: ["Inter_400Regular"],
        "inter-bold": ["Inter_700Bold"],
      },
      borderRadius: {
        card: "24px",
        input: "14px",
        button: "14px",
      },
    },
  },
  plugins: [],
};
