const path = require("path");
const { merge } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");

const CURRENT_WORKING_DIR = process.cwd();

const res = (p) => path.resolve(CURRENT_WORKING_DIR, p);
const entry = res("prisma/seed/index.js");
const output = res("prisma/seed/dist");

module.exports = {
  name: "server",
  target: "node",
  mode: "development",
  externals: [nodeExternals()],
  entry: { main: entry },
  output: {
    path: output,
    filename: "bundle.js",
  },
  devtool: "eval",
};
