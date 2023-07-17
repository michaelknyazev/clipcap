const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`

  config.entry = {
    ...config.entry,
    youtube: './src/content_scripts/youtube.tsx',
    background: './src/background_scripts/background.ts',
  }

  // Update the output filename
  config.output.filename = (chunkData) => {
    if (chunkData.chunk.name === "youtube") return "content_scripts/[name].[contenthash].js";
    if (chunkData.chunk.name === "background") return "background_scripts/[name].[contenthash].js";

    return '[name].[contenthash].js';
  };

  config.optimization.runtimeChunk = false;
  
  return config;
});
