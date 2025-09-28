const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index.ts", // your main entry
  mode: "development",
  devServer: {
    port: 3001,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      // TypeScript and JavaScript
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: "ts-loader",
        exclude: [/node_modules/, /\.test\.(ts|tsx)$/], // <-- exclude tests
      },
      // CSS Modules
      {
        test: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      // Global CSS
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./Header": "./src/components/Header",
      },
      shared: {
        ...deps,
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        "react-dom": { singleton: true, eager: true, requiredVersion: deps["react-dom"] },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto", // required for module federation
    clean: true, // optional: clean old builds
  },
  devtool: "source-map", // optional: easier debugging
};
