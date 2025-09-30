const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index.ts", // your main entry
  mode: "development",
  devServer: {
    port: 3002,
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
        exclude: [/node_modules/, /\.test\.(ts|tsx)$/], // <-- exclude tests FOR AWS
      },
      // CSS Modules
      {
        test: /\.module\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: false,
              modules: true,
            },
          },
        ],
      },
      // Global CSS
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "footer",
      filename: "remoteEntry.js",
      exposes: {
        "./Footer": "./src/bootstrap",
      },
      shared: {
        ...deps,
        react: { singleton: true, requiredVersion: deps.react },
        "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
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
