const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, "src/docs/index.jsx"),
  output: {
    path: path.join(__dirname, "docs"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
        {
            test: /\.css$/, use: ExtractTextPlugin.extract({
                use: {
                    loader: 'css-loader',
                    options: {
                        url: false,
                        minimize: true
                    }
                }
            })
        }
    ]
  },
  plugins: [
      new ExtractTextPlugin('bundle.css'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/docs/index.html")
      })
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    contentBase: path.join(__dirname, "docs"),
    port: 8000,
    stats: "minimal"
  }
};
