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
		path.join(__dirname, public_dir, 'main.js')
	],
	resolve: {
		root: [path.resolve('./src/view')],
		extensions: ['', '.js', '.jsx', '.css', '.json', '.txt', '.ico']
	},
	output: {
		filename: '[name].js'
	},
	eslint: {
		configFile: './.eslintrc.js',
		outputReport: {
			filePath: 'checkstyle.xml',
			formatter: require('eslint/lib/formatters/checkstyle'),
		}
	},
	module: {
		preLoaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'eslint-loader'
			}
		],
		loaders: [
			{
				test: /\.css$/, // Only .css files
				loader: 'style!css' // Run both loaders
			},
			{
				test: /\.jsx?$/,
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
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{ test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
			{ test: /\.(woff|woff2)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
			{ test: /\.ttf$/, loader: "file-loader" },
			{ test: /\.eot$/, loader: "file-loader" },
			{ test: /\.svg$/, loader: "file-loader" },
			{ test: /\.png$/, loader: "file-loader" }
		]
	}
};

