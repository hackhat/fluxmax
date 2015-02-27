var _               = require('lodash');
var RealTimeChanges = require('./RealTimeChanges');
var Listen          = require('./Listen');
var ChangeTypes     = require('./ChangeTypes');






var Fluxmax = function(){
    this.__eachChange            = new RealTimeChanges();
    this.__batchChange           = new RealTimeChanges();
    this.__entities              = [];
    this.__entitiesById          = {};
    this.__changeTypesByEntityId = {};
    this.__metaEntities          = [];
};






Fluxmax.ChangeTypes = ChangeTypes;



Fluxmax.__instance = void 0;



Fluxmax.getInstance = function(){
    if(!Fluxmax.__instance){
        Fluxmax.__instance = new Fluxmax();
    }
    return Fluxmax.__instance;
}



Fluxmax.listen = function(entityId, listenerDefs){
    var listen = new Listen(entityId, listenerDefs);
    // Need to start in order to test deps.
    listen.start(Fluxmax.getInstance(), listen.createMockObject());
    return listen;
}



/**
 * Your entity should have
 *
 *     Entity.meta = {
 *         id: 'id of the entity',
 *         changeTypes: [
 *             'change'      ,
 *             'anotherType' ,
 *         ],
 *         listeners: [] // See below
 *     }
 *
 * This method is static and is only needed for debug purposes to immediately
 * know whenever your deps and listeners are correct.
 *
 * Items is an array of listener definition:
 *
 *     var listenerType = 'batch' // or 'each'
 *     var entityId = 'a string' // for example 'store.currentAction'
 *     var changeType = 'a string' // for example 'change' or 'reachedDestination'
 *     var methodName = 'a string' // The method to be called on the entity when the change is fired.
 *     var listeners = [
 *         [listenerType, entityId, changeType, methodName]
 *     ]
 *
 *
 */
Fluxmax.addMetaEntity = function(metaEntity){
    var listen = Fluxmax.listen(metaEntity.id, metaEntity.listeners);
    // if(DEBUG){
        var app = Fluxmax.getInstance();
        app.setEntityChangeTypes(metaEntity.id, metaEntity.changeTypes)
        app.addMetaEntity(metaEntity);
    // }
    return listen;
}



Fluxmax.renderDependencies = function(){
    Fluxmax.getInstance().renderDependencies();
}



Fluxmax.checkDependencies = function(){
    Fluxmax.getInstance().checkDependencies();
}





_.extend(Fluxmax.prototype, {



    addEntities: function(entities){
        entities.forEach(function(entity){
            var entityId = entity.getEntityId();
            if(!entityId){
                return console.log('No entity id');
            }
            if(this.__entitiesById[entityId]){
                throw new Error('Entity "' + entityId + '" already exists.')
            }
            // Store entity.
            this.__entities.push(entity);
            this.__entitiesById[entityId] = entity;
            // Listen on entity changes.
            var onEntityChange = this.__onEntityChange.bind(this, entityId);
            entity.on('change', onEntityChange);
            this.setEntityChangeTypes(entityId, entity.getChangeTypes())
        }.bind(this))
    },



    /**
     * For static test.
     */
    addMetaEntity: function(entityMeta){
        this.__metaEntities.push(entityMeta);
    },



    setEntityChangeTypes: function(entityId, changeTypesDef){
        this.__changeTypesByEntityId[entityId] = new ChangeTypes(changeTypesDef);
    },



    /**
     * Only based on static deps.
     * @return {[type]} [description]
     */
    renderDependencies: function(){
        this.__eachChange.renderDependecies('each');
        this.__batchChange.renderDependecies('batch');
        console.group('Entities')
        var metaEntities = _.sortBy(this.__metaEntities, 'id');
        metaEntities.forEach(function(metaEntity){
            console.log('%c' + metaEntity.id + ': ' + (new ChangeTypes(metaEntity.changeTypes)).getAll().join(', '), 'color: green')
        })
        console.groupEnd();
    },



    /**
     * Check if the events that has been registered in the __each and __batch
     * are valid based on the Entity.changeTypes provided.
     * @type {[type]}
     */
    checkDependencies: function(){
        var eachDeps  = this.__eachChange.getDependencies();
        eachDeps = eachDeps.map(function(dep){
            return _.extend({}, dep, {depType: 'each'})
        })
        var batchDeps = this.__batchChange.getDependencies();
        batchDeps = batchDeps.map(function(dep){
            return _.extend({}, dep, {depType: 'batch'})
        })
        var deps = _.sortBy(eachDeps.concat(batchDeps), ['callerSrc', 'targetSrc', 'type']);
        var errors = [];
        var valid  = [];
        deps.forEach(function(dep){
            var changeTypes = this.__changeTypesByEntityId[dep.targetSrc];
            var text = 'Dependency defined in "' + dep.callerSrc + '" on "' + dep.targetSrc + '" at type "' + dep.targetType + '" is ';
            var isValid = true;
            if(!changeTypes || !changeTypes.exists(dep.targetType)){
                isValid = false;
            }
            var depType = ' [' + dep.depType + ']';
            if(isValid){
                valid.push(text + 'valid.' + depType);
            }else{
                errors.push(text + 'not valid.' + depType);
            }
        }.bind(this))
        console.group('Errors')
        errors.forEach(function(error){console.log('%c' + error, 'color: red')})
        if(errors.length === 0){
            console.log('%c No errors!', 'color: green')
        }
        console.groupEnd()
        console.group('Valid')
        valid.forEach(function(valid){console.log('%c' + valid, 'color: green')})
        console.groupEnd()
    },



    /**
     * Call to add a listener for each change that happens in the app.
     */
    onEach: function(callerSrc, targetSrc, targetType, runCb, callbackName, target){
        this.__eachChange.on(callerSrc, targetSrc, targetType, runCb, callbackName, target);
    },



    /**
     * Call to add a listener for a batch change that happens in the app.
     */
    onBatch: function(callerSrc, targetSrc, targetType, runCb, callbackName, target){
        this.__batchChange.on(callerSrc, targetSrc, targetType, runCb, callbackName, target);
    },



    /**
     * Call to remove a listener for each change that happens in the app.
     */
    offEach: function(callerSrc, targetSrc, targetType, runCb, callbackName, target){
        this.__eachChange.off(callerSrc, targetSrc, targetType, runCb, callbackName, target);
    },



    /**
     * Call to remove a listener for a batch change that happens in the app.
     */
    offBatch: function(callerSrc, targetSrc, targetType, runCb, callbackName, target){
        this.__batchChange.off(callerSrc, targetSrc, targetType, runCb, callbackName, target);
    },



    /**
     * Called when an entity changes.
     * It will emit the change to all entities.
     */
    __onEntityChange: function(entityId, changePayload){
        if(!entityId || !changePayload) throw new Error('entityId or changePayload is missing');
        var payload = {
            src  : entityId,
            type : changePayload.type,
            data : changePayload.data
        }
        this.__eachChange.emitChangeToListeners(payload);
    },



    /**
     * Adds a change to the system. Some entities might want to
     * to use this way to make other know about their changes.
     */
    injectChange: function(entityId, changeType, changeData){
        this.__onEntityChange(entityId, {
            type: changeType,
            data: changeData,
        });
    },



    emitBatchChanges: function(){
        var changes = this.__eachChange.getChanges();
        if(changes.length === 0) return;
        this.__eachChange.clearChanges();
        var changesBySrc = {};
        changes.forEach(function(change){
            var src = change.src;
            var type = change.type;
            if(!changesBySrc[src]){
                changesBySrc[src] = {};
            }
            if(!changesBySrc[src][type]){
                changesBySrc[src][type] = [];
            }
            changesBySrc[src][type].push(change);
        })

        // Emit every change by source.
        var emittedChangesN = 0;
        var emittedChanges = []
        _.forEach(changesBySrc, function(changesByType, src){
            _.forEach(changesByType, function(changes, type){
                var payload = {
                    src  : src,
                    type : type,
                    data : changes,
                }
                var listeners = this.__batchChange.emitChangeToListeners(payload);
                emittedChanges.push({
                    payload   : payload,
                    listeners : listeners,
                })
                emittedChangesN++;
            }.bind(this))
        }.bind(this))
        // this.__emittingChanges = false;
        // this.__changesN = 0;

        // Show changes in console
        if(emittedChangesN > 0 && DEBUG){
            console.groupCollapsed('UI Update: ' + changes[0].src + ' @ ' + changes[0].type);
            console.log('All changes:');
            console.table(changes);
            console.log('Emitted changes:');
            console.table(emittedChanges);
            emittedChanges.forEach(function(emitted){
                emitted.listeners.forEach(function(listener){
                    console.log(emitted.payload.src + ' . ' + emitted.payload.type + ' > ' + listener.callerSrc + ' . ' + listener.cbName)
                })
            })

            // console.log('Emitted changes:');
            // var changesBySrcFormatted = [];
            // _.forEach(changesBySrc, function(changes, src){
            //     changesBySrcFormatted.push({
            //         src: src,
            //         types: changes.map(function(change){
            //             return change.type;
            //         }).join(', '),
            //         length: changes.length,
            //         detailed: changes,
            //     })
            // })
            // console.table(changesBySrcFormatted);
            console.groupEnd();
        }
    }



});




module.exports = Fluxmax;
