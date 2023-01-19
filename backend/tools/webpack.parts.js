const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const NodemonPlugin = require("nodemon-webpack-plugin");
const Dotenv = require("dotenv-webpack");

exports.clean = () => ({
  plugins: [new CleanWebpackPlugin()],
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

exports.NodemonPlugin = (options) => ({
  plugins: [new NodemonPlugin(options)],
});

exports.environmentVariables = (options) => ({
  plugins: [new Dotenv(options)],
});
