/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dev = process.env.NODE_ENV === "development";

module.exports = {
  context: path.resolve(__dirname, "src"),

  devServer: {
    historyApiFallback: true,
    port: 3000,
    static: {
      watch: false, // https://github.com/webpack/webpack-dev-server/issues/2893
    },
  },

  devtool: "source-map",

  entry: "./index.tsx",

  mode: process.env.NODE_ENV,

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: dev,
            plugins: [dev && "react-refresh/babel"].filter(Boolean),
          },
        },
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: dev ? "[path][name]__[local]" : "[hash:base64]",
              },
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
                // modifyVars: theme,
              },
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  optimization: {
    // chunkIds: ids,
    minimizer: [`...`, new CssMinimizerPlugin()],
    // moduleIds: ids,
    // runtimeChunk: 'single',
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({
      // filename: `${filename}.css`,
      // ignoreOrder: true,
    }),
    dev && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),

  resolve: {
    extensions: [".tsx", ".ts", ".mjs", ".js", ".json"],
  },
};
