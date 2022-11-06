const enablePurge = true;

module.exports = {
  important: true,
  purge: {
    enabled: enablePurge,
    content: ["./src/**/*.{html,js}", "./src/**/*.scss"],
  },
  //'./node_modules/tw-elements/dist/js/**/*.js'
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      keyframes: {
        floating: {
          "0%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(10px)",
          },
          "100%": {
            transform: "translateY(0px)",
          },
        },
        "vertical-spin": {
          "0%": {
            transform: "rotateY(0)",
          },
          "100%": {
            transform: "rotateY(360deg)",
          },
        },
      },
      animation: {
        "spin-slow": "spin 3s ease-in-out infinite",

        "bounce-slow": "bounce 3s ease-in-out infinite",

        "spin-alt": "spin 3s cubic-bezier(0.455, 0.030, 0.515, 0.955) infinite",

        "vertical-spin":
          "vertical-spin 3s cubic-bezier(0.455, 0.030, 0.515, 0.955) infinite both",

        floating: "floating 3s ease-in-out infinite",
      },
    },
  },
  daisyui: {
    themes: [
      {
        night: {
          ...require("daisyui/src/colors/themes")["[data-theme=night]"],
          primary: "#64A4FD",
          secondary: "#bc8c4b", // "#fdbd64",
          accent: "#5f8d3e",
        },
      },
    ],
  },
  //require('tw-elements/dist/plugin')
  plugins: [require("daisyui")],
};
