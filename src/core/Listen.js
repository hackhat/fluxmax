var _ = require('lodash');





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
