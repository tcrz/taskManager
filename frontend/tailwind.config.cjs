/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      visibility: ["group-hover"],
      colors: {
        // "dark-purple": "#081A51",
        "light-white": "#F8FAFC",
        "dark-blue": "#202837"
      },
      boxShadow: {
        "toolbar-shadow": "3px 5px 20px rgba(112, 112, 112, 0.9)",
        "subtoolbar-shadow": "#e2e1e1 inset 0 20px 20px -20px"
      },
      height: {
        "6v": "6vh",
        "7v": "7vh",
        "8v": "8vh",
        "9v": "9vh",
				"10v": "10vh",
				"20v": "20vh",
				"30v": "30vh",
				"40v": "40vh",
				"50v": "50vh",
				"60v": "60vh",
				"70v": "70vh",
				"80v": "80vh",
        "89v": "89vh",
				"90v": "90vh",
				"100v": "100vh",
			},
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
