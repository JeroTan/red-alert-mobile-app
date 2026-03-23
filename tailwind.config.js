/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class', // Force manual dark mode control
  theme: {
    extend: {
      colors: {
        // Brand Colors
        "brand-primary": '#EB0A1E',
        "brand-black": '#000000',
        "brand-white": '#FFFFFF',
        "brand-gray": '#58595B',

        // Emergency Colors
        "emergency-critical": '#DC2626',
        "emergency-warning": '#F59E0B',
        "emergency-success": '#10B981',
        "emergency-info": '#3B82F6',

        // Agency Colors
        "agency-police": '#1E40AF',
        "agency-fire": '#B91C1C',
        "agency-medical": '#059669',
        "agency-disaster": '#EA580C',
      },
      fontFamily: {
        "toyota": ['ToyotaType', 'sans-serif'],
        "toyota-bold": ['ToyotaType-Bold', 'sans-serif'],
        "toyota-light": ['ToyotaType-Light', 'sans-serif'],
        "toyota-semibold": ['ToyotaType-Semibold', 'sans-serif'],
        "toyota-italic": ['ToyotaType-Italic', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
