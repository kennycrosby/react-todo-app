/*
	./webpack.config.js
*/
const path = require('path');

// Copy over static files
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CopyWebpackPluginConfig = new CopyWebpackPlugin([
		{ from: 'src/public-assets' },
		{ from: 'src/assets', to: 'assets' }
	], {
		ignore: []
	});

// Clean out public folder
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CleanWebpackPluginConfig = new CleanWebpackPlugin(['public']);

// Inject bundle into the html template
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			inject: 'body'
		});

// Extract css for production
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ExtractTextPluginConfig = new ExtractTextPlugin({
	    	filename: 'styles.css'
	    });


module.exports = {
	entry: './src/index.js',

	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js'
	},

	devtool: 'eval',

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: [
					"babel-loader",
					// "eslint-loader",
		        ],
				exclude: /node_modules/
			},

			{
	            test: /\.scss$/,
	            use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					//resolve-url-loader may be chained before sass-loader if necessary
					use: [
						'css-loader',
						'postcss-loader',
						'sass-loader'
					]
		        })
	        },

	        {
	        	test: /\.(jpe?g|png|gif|svg)$/i,
	        	use: 'file-loader?name=/assets/images/[name].[ext]'
	        }
		]
	},

	plugins: [
		HtmlWebpackPluginConfig,
        ExtractTextPluginConfig,
        CopyWebpackPluginConfig,
        CleanWebpackPluginConfig
    ]

}