/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}', // <-- Ensure this line is present and correct for your source files
    // Add this line for Shadcn UI components:
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#9333EA',
        'background': '#1E293B',
        'text': '#F1F5F9',
        'accent': '#64748B',
      },
    },
  },
  plugins: [],
};