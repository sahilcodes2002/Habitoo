module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'smd': '640px', // Custom breakpoint for 640px and above
      },
    },
  },
  plugins: [],
}
