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


// Separate out css file for production for caching but use style-loader
// in development so we can use source maps
let cssLoader;
if (process.env.NODE_ENV === 'development') {
    console.log(':: ===== USING DEVELOPMENT CSS');

    cssLoader = {
				test: /\.scss$/,
				use: [
					{ loader: 'style-loader', options: { sourceMap: true } },
					{ loader: 'css-loader', options: { sourceMap: true } },
					{ loader: 'postcss-loader', options: { sourceMap: true } },
					{ loader: 'sass-loader', options: { sourceMap: true } }
				]
	        }

} else {
	console.log(':: ===== USING PRODUCTION CSS');

	cssLoader = {
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
	        }
}


module.exports = {
	entry: './src/index.js',

	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js'
	},

	devtool: 'source-map',

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

			cssLoader,

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