const { merge } = require("webpack-merge");

const commonConfig = require("./webpack.common"),
  parts = require("./webpack.parts");

const productionConfig = merge([
  commonConfig,
  { mode: "production" },
  parts.generateSourceMaps({ type: "source-map" }),
]);

module.exports = productionConfig;
