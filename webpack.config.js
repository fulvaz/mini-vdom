const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    mode: "development", // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.
    entry: "./src/index.tsx", // string | object | array  // defaults to ./src
    context: path.resolve(__dirname),
    // Here the application starts executing
    // and webpack starts bundling
    output: {
        // options related to how webpack emits results
        path: path.resolve(__dirname, "dist"), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)
        filename: "bundle.js", // string    // the filename template for entry chunks
        library: "mini_dom", // string,
        // the name of the exported library
        libraryTarget: "umd", // universal module definition    // the type of the exported library
        /* Advanced output configuration (click to show) */
},
    module: {
        // configuration regarding modules
        rules: [
            // rules for modules (configure loaders, parser options, etc.)
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                exclude: [
                    //   path.resolve(__dirname, "app/demo-files")
                    path.resolve(__dirname, "node_modules")
                ],

                loader: "babel-loader",

                options: {
                    presets: [
                        '@babel/preset-env',
                        ["@babel/preset-react", {
                            pragma: 'h',
                        }]
                    ],
                    
                },

            },

        ],
        /* Advanced module configuration (click to show) */
},
    resolve: {
        // options for resolving module requests
        // (does not apply to resolving to loaders)
        modules: [
            "node_modules",
            path.resolve(__dirname, "app")
        ],
        // directories where to look for modules
        extensions: [".js", ".json", ".jsx", ".css", ".ts", ".tsx"],
        // extensions that are used
        alias: {
            //   // a list of module name aliases
            //   "lib": path.resolve(__dirname, "lib"),
            //   // alias "module" -> "new-module" and "module/path/file" -> "new-module/path/file"
            //   "only-module$": "new-module",
            //   // alias "only-module" -> "new-module", but not "only-module/path/file" -> "new-module/path/file"
            //   "module": path.resolve(__dirname, "app/third/module.js"),
            //   // alias "module" -> "./app/third/module.js" and "module/file" results in error
            //   // modules aliases are imported relative to the current context
        },
        plugins: [new TsconfigPathsPlugin({
            configFile: path.resolve(__dirname, "tsconfig.json")
        })]
        /* alternative alias syntax (click to show) */
        /* Advanced resolve configuration (click to show) */
},

    devtool: "inline-source-map", // enum  // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.

    serve: { //object
        port: 1337,
        content: './dist',
        // ...
    },
    // lets you provide options for webpack-serve
    stats: "errors-only",  // lets you precisely control what bundle information gets displayed
    devServer: {
        // contentBase: path.join(__dirname, 'dist'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        port: 3000,
        inline: true,
        // ...
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html')
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    // list of additional plugins
    /* Advanced configuration (click to show) */
}