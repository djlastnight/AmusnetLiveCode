const path = require("path");

var debug = process.env.NODE_ENV !== 'production';
const CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin')
var webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    devtool: "source-map",
    devServer: {
        compress: true,
        allowedHosts: "all"
    },
    plugins: [
        new webpack.DefinePlugin({
            ENVIRONMENT: JSON.stringify(process.env.NODE_ENV),
            DEBUG: JSON.stringify(debug)
        }),
        new CopyWebpackPlugin
        ([
            {from: path.resolve(__dirname,'./game/static/'), to: path.resolve(__dirname, (debug ?'./dev/' :'./build/'))},
            {from: path.resolve(__dirname,'./game/src/styles'), to: path.resolve(__dirname, (debug ?'./dev/' :'./build/'))}
        ]),
        new MiniCssExtractPlugin({
            filename:'styles/styles.css',
            chunkFilename: 'chunks.css',
            ignoreOrder: false,
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true,
            cache: false
        }),
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /a\.js|node_modules/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // allow import cycles that include an asyncronous import,
            // e.g. via import(/* webpackMode: "weak" */ './file.js')
            allowAsyncCycles: false,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
          })
    ],

    entry: "./game/src/index.ts",
    mode:debug ?"development":"production",
    output: {
        path: path.resolve(__dirname, './build/'),
        filename: "game.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
              },
              {
                test: /\.css$/,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                   
                    },
                    'css-loader',
                  ],
                
              },
              {
                test: /.m?js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.mjs' ],
        modules: ['node_modules', 'src/']
    }
};
