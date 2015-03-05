var BaseStore = require('./BaseStore');
var App       = require('fluxmax').App;





var UserStore = function(){
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
        ['each', 'store.task', 'done', '__onTaskDone'],
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



    __onTaskDone: function(){
        this.__increasePoints(10);
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
