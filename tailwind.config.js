module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      rotate: {
        360: "360deg",
      },
      colors: {
        "base-color": "#FFFAFA",
        "app-bg": "#F2E1E1",
        "primary-color": "#F2E1E1",
        "primary-light": "#F3CFCF",
        "active-color": "#FFDADA",
        "btn-color": "#EAB4CE",
      },
    },
  },
  plugins: [],
};
