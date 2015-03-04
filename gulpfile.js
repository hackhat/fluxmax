var gulp    = require('gulp');
var path    = require('path');
var webpack = require('webpack');
var gutil   = require('gutil');
var async   = require('async');
var _       = require('lodash');





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

    // var cb =

    var externals = {
        '_'      : '_',
        'lodash' : '_',
        '_'      : 'lodash',
        'lodash' : 'lodash',
    }

    // Development
    var devConfig = Object.create(defaultConfig);
    devConfig.debug = true;
    devConfig.output.filename  = 'Fluxmax.js';

    // Dev no lodash
    var devNoLodashConfig = Object.create(devConfig);
    devNoLodashConfig.output.filename  = 'Fluxmax.nolodash.js';
    devNoLodashConfig.externals = externals;

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

    // Production no lodash
    var prodNoLodashConfig = Object.create(prodConfig);
    prodNoLodashConfig.output.filename  = 'Fluxmax.nolodash.min.js';
    prodNoLodashConfig.externals = externals;

    async.series(
        _.map([
            devConfig,
            devNoLodashConfig,
            prodConfig,
            prodNoLodashConfig
        ], function(config){
            return function(cb){
                webpack(config, function(err, stats) {
                    if(err) throw new gutil.PluginError("webpack:build", err);
                    gutil.log("[webpack:build]", stats.toString({
                        colors: true
                    }));
                    cb();
                })
            }
        }), function(){
        console.log('All builds done.')
    })
});
