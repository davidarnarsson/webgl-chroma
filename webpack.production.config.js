const webpack = require("webpack");
const { join, resolve } = require("path");

module.exports = {
  entry: resolve(__dirname, "src", "index.js"),
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist"),
    publicPath: "/",
    sourceMapFilename: 'bundle.js.map'
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader?modules"]
      },
      {
        test: /\.(vertex|fragment)$/,
        use: "raw-loader"
      }
    ]
  },
  plugins: [     ],
  resolve: {
    modules: [resolve(__dirname, "src"), "node_modules"],
    extensions: [".js", ".fragment", ".vertex"]
  }
};
