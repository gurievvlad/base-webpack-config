const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const fs = require('fs');
// Finds all JS files in the passed directory
// Searches only in the root of this folder, so modules should be placed only in subfolders
fileSelect = (dir) => {
  let files = {};
  fs.readdirSync(dir + 'js').forEach(file => {
    if (file.endsWith('.js')) {
      files[file.split('.')[0]] = dir + 'js/' + file
    }
  })
  return files;
}

const config = {
  entry: fileSelect(__dirname + '/src/'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {loader: "css-loader"},
          {loader: "sass-loader"},
        ]
      }
    ]
  },
};

module.exports = config;
