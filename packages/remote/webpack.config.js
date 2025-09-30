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
              // Ensure css-loader returns a CommonJS-style export for compatibility
              // with how the project imports CSS modules (import styles from '...').
              // css-loader v3+ defaults to ES modules which can cause the imported
              // value to be { default: { ... } } and make `styles.button` undefined.
              esModule: false,
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
      // Keep React and react-dom as singletons but avoid eager loading.
      // Eager:true can cause duplicate React copies in federated builds and
      // lead to runtime errors like the scheduler trying to access internals.
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
