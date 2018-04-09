var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var public_dir = "src/view";
//var ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'source-map',
  entry: [
    path.join(__dirname, public_dir, 'main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: ''
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, public_dir, 'index.html'),
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': JSON.stringify('production') }
    }),
    //new webpack.optimize.CommonsChunkPlugin('main.js'),
	  new webpack.optimize.DedupePlugin(),
	  new webpack.optimize.UglifyJsPlugin({
      compress: {  warnings: false }
    }),
	  new webpack.optimize.AggressiveMergingPlugin()
  ],
  resolve: {
  	root: [path.resolve('./src/view/utils'), path.resolve('./src/view')],
    extensions: ['', '.js', '.jsx','.css' , '.json','.txt']
  },
  module: {
    loaders: [
      {
        test: /\.css$/, // Only .css files
        loader: 'style!css' // Run both loaders
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
          test: /\.(ico)$/,
          loader: "static-loader"
      },
      {
          test: /\.(txt)$/,
          loader: "static-loader"
      },
      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
      { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/,    loader: "file-loader" },
      { test: /\.eot$/,    loader: "file-loader" },
      { test: /\.svg$/,    loader: "file-loader" },
      { test: /\.png$/,    loader: "file-loader" }
    ]
  }
};
