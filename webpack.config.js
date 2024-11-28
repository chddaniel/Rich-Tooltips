const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // Cleans the dist folder before each build
    },
    mode: 'production', // 'development' for live reload and debugging, 'production' for builds
    devServer: {
        static: path.resolve(__dirname, 'src'),
        port: 3000,
        open: true,
        hot: true,
        liveReload: true,
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            filename: 'index.html', // Ensure the file is named index.html
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/, // Match all JavaScript files
                exclude: /node_modules/, // Exclude node_modules from processing
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], // Use the preset for modern JavaScript
                    },
                },
            },
            {
                test: /\.css$/, // Match .css files
                use: ['style-loader', 'css-loader'], // Use these loaders
            },
        ],
    },

};
