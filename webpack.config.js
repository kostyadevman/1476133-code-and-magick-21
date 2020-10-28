const path = require("path");

module.exports = {
  entry: [
    "./js/utils.js",
    "./js/debounce.js",
    "./js/backend.js",
    "./js/form.js",
    "./js/dialog.js",
    "./js/wizard.js",
    "./js/similar.js",
    "./js/filter.js",
    "./js/setup.js",
    "./js/stat.js",
    "./js/avatar.js",
    "./js/game.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/js"),
    iife: true
  },
  devtool: false
}

