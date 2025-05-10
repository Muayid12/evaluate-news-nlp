const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
<<<<<<< HEAD
const WorkboxPlugin = require('workbox-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
=======
const WorkboxPlugin = require('workbox-webpack-plugin');
>>>>>>> parent of c19b64a4 (testing)

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
<<<<<<< HEAD
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin(), 
            new CssMinimizerPlugin()
        ]
    },
=======
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
        }
        ]
    },
>>>>>>> parent of c19b64a4 (testing)
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html"
        }),
<<<<<<< HEAD
        new WorkboxPlugin.GenerateSW(),
        new MiniCssExtractPlugin({ filename: "[name].css" })
=======
        new WorkboxPlugin.GenerateSW()
>>>>>>> parent of c19b64a4 (testing)
    ],
    devServer: {
        port: 3000,
        allowedHosts: 'all'
    }
}