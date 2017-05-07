
const webpack = require('webpack');
const { join, resolve } = require("path");

module.exports = {
  entry: [
    "react-hot-loader/patch",
    // activate HMR for React

    "webpack-dev-server/client?https://89.160.199.239:8080",
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    "webpack/hot/only-dev-server",
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    resolve(__dirname, "src", "index.js")
    // the entry point of our app
  ],
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist"),
    publicPath: "/",
    sourceMapFilename: 'bundle.js.map'
  },
  devtool: "inline-source-map",

  devServer: {
    hot: true,
    // enable HMR on the server

    
    // match the output path

    publicPath: "/"
    // match the output `publicPath`
  },

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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin()
    // prints more readable module names in the browser console on HMR updates
  ],
  resolve: {
    modules: [resolve(__dirname, "src"), "node_modules"],
    extensions: [".js", ".fragment", ".vertex"]
  }
};
