/*
* Webpack configuration which specifies how assets are bundled and compiled
*/

const path = require('path');

module.exports = {
     entry: './index',
     output: {
         filename: 'bundle.js',
         path: path.resolve(__dirname, 'public'),
     },
     module: {
         loaders: [
           {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
           },
           {
            test: /\.scss$/,
            loader: "style-loader!css-loader!sass-loader"
          }
         ]
     },
     devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      hot: true,
    }
 }
