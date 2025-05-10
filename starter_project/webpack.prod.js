const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
	    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        libraryTarget: 'var',
        library: 'Client'
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
        }
        ]
    },
	optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new WorkboxPlugin.GenerateSW()
		new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
    ],
    devServer: {
        port: 3000,
        allowedHosts: 'all'
    }
}
