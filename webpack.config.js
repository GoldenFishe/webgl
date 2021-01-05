const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|gltf|bin)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets',
                },
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'docs'),
    },
    plugins: [
        new HtmlWebpackPlugin({template: "./src/public/index.html"})
    ]
};