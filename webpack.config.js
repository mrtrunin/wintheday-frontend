var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './build');
var PUBLIC_DIR = path.resolve(__dirname, './public');
var APP_DIR = path.resolve(__dirname, './src/client');
var ENV_DIR = path.resolve(__dirname, '.env');

var env = require('dotenv').config(ENV_DIR).parsed 
    ? require('dotenv').config(ENV_DIR).parsed 
    : process.env;

const config = () => {

    return {
        entry: {
            main: [
                'babel-polyfill',
                APP_DIR + '/index.js'
            ]
        },
        output: {
            filename: 'bundle.js',
            path: BUILD_DIR,
            publicPath: PUBLIC_DIR
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': 
                
                env.NODE_ENV === 'development' ? {
                    
                    'REACT_APP_CLIENT_ID': JSON.stringify(env.DEVELOPMENT_CLIENT_ID),
                    'REACT_APP_CLIENT_SECRET': JSON.stringify(env.DEVELOPMENT_CLIENT_SECRET),
                    'SERVER_URL': JSON.stringify(env.DEVELOPMENT_SERVER)

                } : env.NODE_ENV === 'staging' ? {
                    'REACT_APP_CLIENT_ID': JSON.stringify(env.STAGING_CLIENT_ID),
                    'REACT_APP_CLIENT_SECRET': JSON.stringify(env.STAGING_CLIENT_SECRET),
                    'SERVER_URL': JSON.stringify(env.STAGING_SERVER)

                } : env.NODE_ENV === 'production' ? {
                    'REACT_APP_CLIENT_ID': JSON.stringify(env.PRODUCTION_CLIENT_ID),
                    'REACT_APP_CLIENT_SECRET': JSON.stringify(env.PRODUCTION_CLIENT_SECRET),
                } : {}
            }),
        ],
        resolve: {
            modules: [
                path.resolve(__dirname + '/src'),
                path.resolve(__dirname + '/static'),
                path.resolve(__dirname + '/node_modules'),
                path.resolve(__dirname + '/src/client/actions'),
                path.resolve(__dirname + '/src/client/')
            ]
        },
        module: {
            rules: [
                {
                    test: /(\.css|.scss)$/,
                    include: path.resolve(__dirname),
                    use: [
                        {
                            loader: 'style-loader' // creates style nodes from JS strings
                        }, {
                            loader: 'css-loader' // translates CSS into CommonJS
                        }, {
                            loader: 'sass-loader' // compiles Sass to CSS
                        }
                    ]
                }, {
                    test: /\.(jsx|js)?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                                presets: [
                                    'react', 'es2015', 'stage-0'
                                ], // Transpiles JSX and ES6,
                                plugins: [
                                    'react-html-attrs',
                                    'transform-class-properties',
                                    'transform-decorators-legacy',
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    }
}
module.exports = config;
