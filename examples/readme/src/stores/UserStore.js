var BaseStore = require('./BaseStore');
var App       = require('fluxmax').App;
var _         = require('lodash');





var UserStore = function(options){
    options = _.extend({
        stores: void 0,
    }, options);
    this.__stores = options.stores;
    BaseStore.apply(this, arguments);
    this.Class = UserStore;
    this.__points = 0;
};





var E = UserStore; // "E" from "Entity".
E.meta = {
    // Unique id of this entity.
    id: 'store.user',
    // What events this entity dispatches.
    changeTypes: [
        /**
         * @event pointsChanged
         * @param {Object} data
         * @param {Number} data.current
         * @param {Number} data.previoud
         * @param {Number} data.delta
         */
        'pointsChanged',
    ],
    // To what events this entity listens to.
    listeners: [
        ['each', 'store.task', 'added', '__onTaskAdded'],
        ['each', 'store.task', 'completed', '__onTaskCompleted'],
        ['each', 'store.task', 'uncompleted', '__onTaskUncompleted'],
    ]
}
E.listen = App.addMetaEntity(E.meta);





_.extend(UserStore.prototype, BaseStore.prototype, {



    getPoints: function(){
        return this.__points;
    },



    __onTaskAdded: function(){
        this.__increasePoints(1);
    },



    __onTaskCompleted: function(task){
        this.__increasePoints(task.pointsOnComplete);
    },



    __onTaskUncompleted: function(task){
        this.__increasePoints(-task.pointsOnComplete);
    },



    __increasePoints: function(points){
        var previousPoints = this.__points;
        this.__points += points;
        this.emitChange('pointsChanged', {
            current  : this.__points,
            previoud : previousPoints,
            delta    : points,
        })
    }



});





module.exports = UserStore;
