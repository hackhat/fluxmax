var Fluxmax =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	    App        : __webpack_require__(1),
	    StoreMixin : __webpack_require__(2),
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var _               = __webpack_require__(3);
	var Context = __webpack_require__(4);
	var Listen          = __webpack_require__(5);
	var ChangeTypes     = __webpack_require__(6);





	/**
	 * @class core.Fluxmax
	 */
	var Fluxmax = function(options){
	    options = _.extend({
	        isSingleton: false,
	    }, options)
	    // Is good to know if is a singleton in order to avoid
	    // nasty bugs when confusing the singleton with the
	    // instance app.
	    this.__isSingleton           = options.isSingleton;
	    this.__eachChange            = new Context();
	    this.__batchChange           = new Context();
	    this.__entities              = [];
	    this.__entitiesById          = {};
	    this.__changeTypesByEntityId = {};
	    this.__metaEntities          = [];
	};






	Fluxmax.ChangeTypes = ChangeTypes;


	/**
	 * @static
	 * @private
	 */
	Fluxmax.__instance = void 0;



	/**
	 * @static
	 */
	Fluxmax.getInstance = function(){
	    if(!Fluxmax.__instance){
	        Fluxmax.__instance = new Fluxmax({
	            isSingleton: true
	        });
	    }
	    return Fluxmax.__instance;
	}



	/**
	 * @static
	 */
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



	/**
	 * @static
	 */
	Fluxmax.renderDependencies = function(){
	    Fluxmax.getInstance().renderDependencies();
	}



	/**
	 * @static
	 */
	Fluxmax.checkDependencies = function(){
	    Fluxmax.getInstance().checkDependencies();
	}





	_.extend(Fluxmax.prototype, {



	    /**
	     * Adds the instances of the entities as array.
	     */
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



	    /**
	     */
	    setEntityChangeTypes: function(entityId, changeTypesDef){
	        this.__changeTypesByEntityId[entityId] = new ChangeTypes(changeTypesDef);
	    },



	    /**
	     * Only based on static deps.
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
	        // Flushes the changes stores in this.__eachChange.
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
	        if(emittedChangesN > 0 && (true)){
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {



	    mount: function(app){
	        if(!this.Class) return console.log('This store is missing Class.');
	        this.Class.listen.start(app, this);
	    },



	    getEntityId: function(){
	        if(!this.Class){
	            return console.log('This store doesnt have this.Class');
	        }
	        return this.Class.meta.id;
	    },




	    getChangeTypes: function(){
	        if(!this.Class){
	            return console.log('This store doesnt have this.Class');
	        }
	        return this.Class.meta.changeTypes;
	    },



	    emitChange: function(type, data){
	        this.emit('change', {
	            type: type,
	            data: data
	        });
	    },


	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = lodash;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3);




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
	            var listenersBySrc = this.__listenersBySrc[payload.src][payload.type] ||
	                            this.__listenersBySrc[payload.src]["*"];
	            if(listenersBySrc){
	                listenersBySrc.forEach(function(listener){
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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3);




	/**
	 * @class core.Listen
	 */
	var Listen = function(entityId, items){
	    this.__entityId = entityId;
	    this.__items    = items;
	};




	Listen.noop = function(){};





	_.extend(Listen.prototype, {



	    start: function(app, target){
	        this.__startOrEnd('start', app, target)
	    },



	    end: function(app, target){
	        this.__startOrEnd('end', app, target)
	    },



	    createMockObject: function(){
	        var mock = {};
	        this.__items.forEach(function(item){
	            var callbackName = item[3];
	            mock[callbackName] = Listen.noop;
	        })
	        return mock;
	    },



	    __startOrEnd: function(type, app, target){
	        this.__items.forEach(function(item){
	            var listenType       = item[0];
	            var listenToEntityId = item[1];
	            var listenToType     = item[2];
	            var callbackName     = item[3];
	            var fn;
	            if(listenType === 'batch'){
	                if(type === 'start'){
	                    fn = app.onBatch;
	                }else if(type === 'end'){
	                    fn = app.offBatch;
	                }else{
	                    throw new Error('Type not available.')
	                }
	            }else if(listenType === 'each'){
	                if(type === 'start'){
	                    fn = app.onEach;
	                }else if(type === 'end'){
	                    fn = app.offEach;
	                }else{
	                    throw new Error('Type not available.')
	                }
	            }else{
	                throw new Error('ListenTtype not available.')
	            }
	            if(!target[callbackName]){
	                throw new Error('Cant find method "' + callbackName + '" on entity "' + this.__entityId + '".')
	            }
	            fn.call(
	                app,
	                this.__entityId,
	                listenToEntityId,
	                listenToType,
	                target[callbackName], // Binding will create a new function
	                callbackName,
	                target
	            )
	        }.bind(this))
	    }



	});




	module.exports = Listen;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3);





	/**
	 * @class core.ChangeTypes
	 */
	var ChangeTypes = function(changeTypes){
	    // If you provide an array create an object from the array.
	    if(_.isArray(changeTypes)){
	        this.__changeTypes = {}
	        changeTypes.forEach(function(changeType){
	            this.__changeTypes[changeType] = true;
	        }.bind(this))
	    }else{
	        this.__changeTypes = changeTypes;
	    }
	};





	_.extend(ChangeTypes.prototype, {



	    get: function(type){
	        if(!this.exists(type)){
	            throw new Error('Change "' + type + '" does not exist.')
	        }
	        return type;
	    },



	    validateData: function(type, data){
	        var schema = this.__getSchema(type);
	        if(schema === true){
	            return {data: 'NO_SCHEMA'}
	        }else if(schema === void 0){
	            return {data: 'NO_TYPE_DEFINED'}
	        }
	        var validator = new Validator(schema);
	        return {data: validator.check(data)};
	    },



	    __getSchema: function(type){
	        return this.__changeTypes[type];
	    },



	    exists: function(type){
	        if(type === '*') return true;
	        return !!this.__changeTypes[type];
	    },



	    getAll: function(){
	        return _.keys(this.__changeTypes);
	    },



	});




	module.exports = ChangeTypes;


/***/ }
/******/ ]);