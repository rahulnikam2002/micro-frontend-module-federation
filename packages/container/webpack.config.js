const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = webpack.container;
const Dotenv = require("dotenv-webpack");
const deps = require("./package.json").dependencies;

const buildDate = new Date().toLocaleString();

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  console.log({ isProduction });

  // Load environment variables from .env.public file
  require('dotenv').config({ path: path.resolve(__dirname, "../../.env.public") });

  // Debug: Log the environment variables to ensure they're loaded
  console.log('Environment variables:', {
    REMOTE_HEADER_URL: process.env.REMOTE_HEADER_URL,
    REMOTE_FOOTER_URL: process.env.REMOTE_FOOTER_URL,
    REMOTE_GLOBALBUTTON_URL: process.env.REMOTE_GLOBALBUTTON_URL
  });

  return {
    entry: "./src/index.ts",
    mode: process.env.NODE_ENV || "development",
    devServer: {
      port: 3000,
      open: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          loader: "ts-loader",
          exclude: [/node_modules/, /\.test\.(ts|tsx)$/],
        },
        // CSS Modules
        {
          test: /\.module\.css$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { esModule: false, modules: true },
            },
          ],
        },
        {
          test: /\.css$/i,
          exclude: /\.module\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      // Load all public env vars from .env.public
      new Dotenv({
        path: path.resolve(__dirname, "../../.env.public"),
        safe: false,
      }),

      // Only BUILD_DATE as a separate env variable
      new webpack.EnvironmentPlugin({ BUILD_DATE: buildDate }),

      // Module Federation config
      new ModuleFederationPlugin({
        name: "container",
        remotes: {
          remote: `remote@${process.env.REMOTE_HEADER_URL}`,
          footer: `footer@${process.env.REMOTE_FOOTER_URL}`,
          globalbutton: `globalbutton@${process.env.REMOTE_GLOBALBUTTON_URL}`,
        },
        shared: {
          ...deps,
          react: { singleton: true, requiredVersion: deps.react },
          "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
        },
      }),

      // HTML template
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
  };
};
