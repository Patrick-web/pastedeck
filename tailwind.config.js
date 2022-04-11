module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      rotate: {
        145: "145deg",
        208: "209deg",
      },
      colors: {
        "base-color": "#FFFAFA",
        "app-bg": "#F2E1E1",
        "primary-color": "#F2E1E1",
        "primary-light": "#F3CFCF",
        "primary-dark": "#DAAEAE",
        "standout-bg": "#F8FFAB",
        "active-color": "#FFDADA",
        "btn-color": "#EAB4CE",
      },
    },
  },
  plugins: [],
};
