const path = require('path');
const loader = require('sass-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.ts'),
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Snake Game',
            filename: 'index.html',
            template: path.resolve('src/index.html'),
        }),
        new MiniCssExtractPlugin(),
    ],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    }
}