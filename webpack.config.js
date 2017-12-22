var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./www/app/app.js",

    devServer: {
      proxy: {
        '/api': 'http://localhost:8085'
      }
      // headers: {"Access-Control-Allow-Origin": "*"},
    },

    devtool: 'source-map',

    output: {
        path: __dirname + '/www',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: [/www\/lib/, /node_modules/],
                // presets for the babel loader, supporting stage-2 es6 funcitonality
                query: {
                  presets: ['es2015', 'stage-2']
                }
            },
            {
               test: /\.scss$/,
               loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap', {
                   allChunks: true
               })
            },
            { test: /\.json$/, loader: "json" },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test   : /\.woff/,
                loader : 'url?prefix=font/&limit=10000&mimetype=application/font-woff&name=assets/[hash].[ext]'
            },
            {
                test   : /\.ttf/,
                loader : 'file?prefix=font/&name=assets/[hash].[ext]'
            },
            {
                test   : /\.eot/,
                loader : 'file?prefix=font/&name=assets/[hash].[ext]'
            },
            {
                test   : /\.svg/,
                loader : 'file?prefix=font/&name=assets/[hash].[ext]'
            },
            // we will load all html files raw, it will allow your to require html files as string templates
            // inside your components, directives
            {
              test: /\.html$/,
              loader: "raw-loader"
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              loaders: [
                  'file?hash=sha512&digest=hex&name=[hash].[ext]',
                  'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
              ]
            }
        ]
    },
    plugins: [
       new ExtractTextPlugin('ionic.app.css', {
           allChunks: true
       })
   ],
    resolve: {
        root: __dirname + "/www",
        modulesDirectories: ["node_modules", "lib", "scss", "app", "core"],
        extensions: ['', '.js']
    }
};
