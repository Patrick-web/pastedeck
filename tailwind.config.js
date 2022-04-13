module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			rotate: {
				145: "145deg",
				208: "209deg",
			},
			colors: {
				"base-color": "var(--base-color)",
				"app-bg": "var(--app-bg)",
				"primary-color": "var(--primary-color)",
				"primary-light": "var(--primary-light)",
				"primary-dark": "var(--primary-dark)",
				"standout-bg": "var(--standout-bg)",
				"active-color": "var(--active-color)",
				"btn-color": "var(--btn-color)",
			},
		},
	},
	plugins: [],
};
