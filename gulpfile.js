var gulp    = require('gulp');
var path    = require('path');
var webpack = require('webpack');
var gutil   = require('gutil');





gulp.task("default", function(callback){

    // Default config.
    var defaultConfig = {
        entry: './src/index',
        output: {
            libraryTarget : "var",
            library       : "Fluxmax",
            path          : path.join(__dirname, './dist'),
        }
    }

    var cb = function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
    }

    // Development
    var devConfig = Object.create(defaultConfig);
    devConfig.debug = true;
    devConfig.output.filename  = 'Fluxmax.js';
    webpack(devConfig, cb);

    // Production
    var prodConfig = Object.create(defaultConfig);
    prodConfig.output.filename = 'Fluxmax.min.js';
    prodConfig.plugins = prodConfig.plugins || [];
    prodConfig.plugins = prodConfig.plugins.concat(
        new webpack.optimize.OccurenceOrderPlugin({
            preferEntry: true
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            source_map    : false,
            compress      : true,
            drop_debugger : false,
            comments      : false,
            no_copyright  : true,
        })
    );
    webpack(prodConfig, cb);
});
