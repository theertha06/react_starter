var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var public_dir = "src/view"
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
module.exports = {
	entry: [
	    'webpack-hot-middleware/client?reload=true',
     	path.join(__dirname,public_dir,'main.js')
	],
	resolve: {
		root:[path.resolve('./src/view')],
		extensions: ['', '.js', '.jsx','.css' , '.json','.txt','.ico']
	},
	output: {
		path:path.join(__dirname,'/dist/'),
		filename: '[name].js',
		publicPath:'/'
	},
	module: {
		loaders: [
			{
                test: /\.css$/, // Only .css files
                loader: 'style!css' // Run both loaders
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
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
	},
	plugins: [
		new HtmlwebpackPlugin({
		   template:path.join(__dirname, public_dir,'index.html'),
		   inject:'body',
		   filename:'index.html'
		}),
		new webpack.ProvidePlugin({
			$:"jquery",
			jquery:"jquery"
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	]
};
