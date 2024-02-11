/* eslint-disable no-undef */
//@ts-check

'use strict';

const path = require('path');
//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const extensionConfig = {
	target: 'node', 
	mode: 'none',

	entry: './src/extension.ts', 	// entry point of the extension
	output: {
		path: path.resolve(__dirname, 'dist/web'),
		filename: 'extension.js',
		libraryTarget: 'commonjs2',
	},
	externals: {
		vscode: 'commonjs vscode',
	},
	resolve: {
		// support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
		fallback:{
			assert: require.resolve('assert'),
			childProcess: require.resolve('child_process'),
		},
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
					},
				],
			},
		],
	},
	devtool: 'nosources-source-map',
	infrastructureLogging: {
		level: 'log', // enables logging required for problem matchers
	},
};
module.exports = [extensionConfig];