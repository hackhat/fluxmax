var _ = require('lodash');




/**
 * @class core.Context
 *
 * Is a context where you can add and remove listeners (#on, #off methods).
 * After the events are set you can call #emitChangeToListeners to emit the change
 * to the listeners.
 */
var Context = function(options){
    options = _.extend({

    }, options);

    this.__listenersBySrc    = {};
    this.__dependenciesBySrc = {};
    this.__dependencies      = [];
    this.__changes           = [];
};





_.extend(Context.prototype, {



    /**
     * @param {String} callerSrc Source of who is listening right now.
     * @param {String} targetSrc Source of whom is listening to.
     * @param {String} targetType The type of change that is listening to.
     * @param {Function} runCb This is called when the change matches the filters.
     */
    on: function(callerSrc, targetSrc, targetType, runCb, cbName, target){
        if(!runCb) throw new Error('runCb is required');
        // @todo: should validate the targetType
        // Setup listeners
        if(!this.__listenersBySrc[targetSrc]){
            this.__listenersBySrc[targetSrc] = {};
        }
        if(!this.__listenersBySrc[targetSrc][targetType]){
            this.__listenersBySrc[targetSrc][targetType] = [];
        }
        var dep = {
            callerSrc  : callerSrc,
            targetSrc  : targetSrc,
            targetType : targetType,
            runCb      : runCb,
            cbName     : cbName,
            target     : target,
        }
        this.__listenersBySrc[targetSrc][targetType].push(dep);

        // Setup dependencies
        if(!this.__dependenciesBySrc[callerSrc]){
            this.__dependenciesBySrc[callerSrc] = {};
        }
        if(!this.__dependenciesBySrc[callerSrc][targetSrc]){
            this.__dependenciesBySrc[callerSrc][targetSrc] = [];
        }
        this.__dependenciesBySrc[callerSrc][targetSrc].push(targetType);
        this.__dependencies.push(dep)
    },



    /**
     * @param {String} callerSrc Source of who is listening right now.
     * @param {String} targetSrc Source of whom is listening to.
     * @param {String} targetType The type of change that is listening to.
     * @param {Function} runCb This is called when the change matches the filters.
     */
    off: function(callerSrc, targetSrc, targetType, runCb, cbName, target){
        var dep = {
            callerSrc  : callerSrc,
            targetSrc  : targetSrc,
            targetType : targetType,
            runCb      : runCb,
            cbName     : cbName,
            target     : target,
        }
        this.__listenersBySrc[targetSrc][targetType] = this.__listenersBySrc[targetSrc][targetType].filter(function(_dep){
            // Return false if equal, therefore is removed.
            return !_.isEqual(_dep, dep);
        })
        this.__dependenciesBySrc[callerSrc][targetSrc] = this.__dependenciesBySrc[callerSrc][targetSrc].filter(function(_targetType){
            // Return false if equal, therefore is removed.
            return !_.isEqual(_targetType, targetType);
        })
        this.__dependencies = this.__dependencies.filter(function(_dep){
            // Return false if equal, therefore is removed.
            return !_.isEqual(_dep, dep);
        })
    },



    /**
     * When a new data change is received, all listeners are notified.
     */
    emitChangeToListeners: function(payload){
        var listeners = [];
        // We add the change before dispatching to have the changes in the correct order.
        this.__changes.push(payload);
        if(this.__listenersBySrc[payload.src]){
            if(this.__listenersBySrc[payload.src][payload.type]){
                this.__listenersBySrc[payload.src][payload.type].forEach(function(listener){
                    listeners.push(listener);
                    listener.runCb.call(listener.target, payload.data);
                })
            }
        }
        if(this.__listenersBySrc[payload.src]){
            if(this.__listenersBySrc[payload.src]['*']){
                this.__listenersBySrc[payload.src]['*'].forEach(function(listener){
                    listeners.push(listener);
                    listener.runCb.call(listener.target, payload.data);
                })
            }
        }
        return listeners;
    },



    /**
     * Deletes all the stored changes.
     */
    clearChanges: function(){
        this.__changes = [];
    },



    /**
     * Returns all changes.
     */
    getChanges: function(){
        return this.__changes;
    },



    /**
     * Returns dependencies.
     */
    getDependencies: function(){
        return this.__dependencies.slice(0);
    },



    /**
     * Renders dependencies.
     */
    renderDependecies: function(type){
        console.group('Dependencies '+type+':')
        var dataByType = [];
        var dataByDeps = [];
        var dependents = {};
        _.forEach(this.__dependenciesBySrc, function(dependenciesByTargetSrc, dependent){
            _.forEach(dependenciesByTargetSrc, function(types, targetSrc){
                dataByDeps.push({
                    entity    : dependent,
                    dependsOn : targetSrc,
                    types     : types,
                })
                types.forEach(function(type){
                    dataByType.push({
                        entity    : dependent,
                        dependsOn : targetSrc,
                        type      : type,
                    })
                })
            })
        })
        _.forEach(this.__dependenciesBySrc, function(dependenciesByTargetSrc, dependent){
            dependents[dependent] = {
                deps: dataByDeps.reduce(function(total, item){
                    return total + (item.entity === dependent ? 1 : 0)
                }, 0),
                depsArray: dataByDeps.reduce(function(total, item){
                    if(item.entity === dependent){
                        total.push(item.dependsOn + '('+item.types.join(', ')+')')
                    }
                    return total;
                }, []).join(', ')
            }
        })
        console.log('All:')
        console.table(dataByType);

        console.log('Depends on:')
        console.table(dependents);

        console.groupEnd();
    }



});




module.exports = Context;
