const { resolve } = require('path')
const CopyPlugin = require("copy-webpack-plugin");

const staticFiles = ['manifest.json', 'icons/*'].map(file => {
  return {
    from: file,
    to: '.'
  }
});

module.exports = {
  mode: 'production',
  entry: {
    content: resolve(__dirname, "src/content.js"),
    document: resolve(__dirname, "src/document.js"),
  },
  output: {
    path: resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  plugins: [
    new CopyPlugin(
      {
        patterns: staticFiles,
      }
    ),
  ]
  // devtool: process.env.NODE_ENV !== 'production'
  //   ? 'inline-source-map'
  //   : false,
}
