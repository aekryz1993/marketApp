const { merge } = require("webpack-merge");

const commonConfig = require("./webpack.common"),
  parts = require("./webpack.parts");

module.exports = merge([
  commonConfig,
  { mode: "development" },
  parts.generateSourceMaps({ type: "eval-source-map" }),
  parts.NodemonPlugin({ verbose: true }),
  parts.environmentVariables(),
]);
