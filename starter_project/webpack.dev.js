const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    stats: {
        all: false,
        warnings: true,
        errors: true,
        warningsFilter: [
            /sass-loader.*deprecated/i,
            /legacy-js-api/i
        ]
    },
    output: {
        filename: 'main.js',
        publicPath: '/', // Needed for devServer static serving
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                quietDeps: true
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "index.html",
        }),
        new CleanWebpackPlugin({
            dry: false,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'src', 'client', 'views'), //serve directly from views
        },
        compress: true,
        port: 3001,
        hot: true,
        open: true,
        historyApiFallback: true
    }
};
