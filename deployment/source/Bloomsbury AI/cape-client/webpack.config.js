const path = require('path')

module.exports = {
  entry: './src/cape.js',
  devtool: 'source-map',
  output: {
    filename: 'cape.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'cape',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
