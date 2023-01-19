const { merge } = require("webpack-merge");
const path = require("path");
const nodeExternals = require("webpack-node-externals");

const parts = require("./webpack.parts");

const CURRENT_WORKING_DIR = process.cwd();

const res = (p) => path.resolve(CURRENT_WORKING_DIR, p);
const entry = res("index.js");
const output = res("public");

module.exports = merge([
  { name: "server" },
  { target: "node" },
  { externals: [nodeExternals()] },
  { entry: [entry] },
  {
    output: {
      path: output,
      publicPath: "/",
    },
  },
  parts.clean(),
]);
