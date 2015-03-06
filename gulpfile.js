var gulp    = require('gulp');
var webpack = require('webpack');
var gutil   = require('gutil');
var async   = require('async');
var _       = require('lodash');





gulp.task("default", function(callback){

    // Default config.
    var defaultConfig = require('./webpack.config');

    var createPlugins = function(){
        return [
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
        ]
    }

    var externals = {
        '_'      : '_',
        'lodash' : '_',
        '_'      : 'lodash',
        'lodash' : 'lodash',
    }

    var configs = {};

    // Development
    var devConfig             = _.cloneDeep(defaultConfig);
    configs.devConfig         = devConfig;
    devConfig.debug           = true;
    devConfig.output.filename = 'Fluxmax.js';

    // Dev no lodash
    var devNoLodashConfig             = _.cloneDeep(devConfig);
    configs.devNoLodashConfig         = devNoLodashConfig;
    devNoLodashConfig.output.filename = 'Fluxmax.nolodash.js';
    devNoLodashConfig.externals       = externals;

    // Production
    var prodConfig             = _.cloneDeep(defaultConfig);
    configs.prodConfig         = prodConfig;
    prodConfig.output.filename = 'Fluxmax.min.js';
    prodConfig.plugins         = prodConfig.plugins || [];
    prodConfig.plugins         = prodConfig.plugins.concat(createPlugins());

    // Production no lodash
    var prodNoLodashConfig             = _.cloneDeep(defaultConfig);
    configs.prodNoLodashConfig         = prodNoLodashConfig;
    prodNoLodashConfig.output.filename = 'Fluxmax.nolodash.min.js';
    prodNoLodashConfig.externals       = externals;
    prodNoLodashConfig.plugins         = prodNoLodashConfig.plugins || [];
    prodNoLodashConfig.plugins         = prodNoLodashConfig.plugins.concat(createPlugins());

    async.series(
        _.map(configs, function(config, name){
            return function(cb){
                console.log(name)
                webpack(config, function(err, stats) {
                    console.log('=====')
                    console.log('=====')
                    console.log(name)
                    console.log('-----')
                    if(err) throw new gutil.PluginError("webpack:build", err);
                    gutil.log(name, stats.toString({
                        colors: true
                    }));
                    cb();
                })
            }
        }), function(){
        console.log('All builds done.')
    })
});
