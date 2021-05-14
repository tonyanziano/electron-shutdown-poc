const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  devtool: "inline-source-map",
  mode: isDev ? "development" : "production",
  entry: path.resolve("./src/renderer/index.tsx"),
  output: {
    path: path.resolve("./dist"),
    filename: "renderer.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: path.resolve(__dirname, "tsconfig.renderer.json"),
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/renderer/index.html"),
      title: "Electron Shutdown POC App",
    }),
  ],
  watch: isDev ? true : false,
};
