var BaseStore = require('./BaseStore');
var App       = require('fluxmax').App;





var TaskStore = function(){
    BaseStore.apply(this, arguments);
    this.Class = TaskStore;
    this.__tasks = [];
};





var E = TaskStore; // "E" from "Entity".
E.meta = {
    // Unique id of this entity.
    id: 'store.task',
    // What events this entity dispatches.
    changeTypes: [
        'added',
        'done',
    ],
    // To what events this entity listens to.
    listeners: [
        ['each', 'actions', 'ui.tasks.addTask', '__onUITaskAdded'],
    ]
}
E.listen = App.addMetaEntity(E.meta);





_.extend(TaskStore.prototype, BaseStore.prototype, {



    getAll: function(){
        return this.__tasks.slice();
    },



    __onUITaskAdded: function(task){
        this.__add(task);
    },



    __add: function(task){
        this.__tasks.push(task);
        this.emitChange('added', task);
    },



});





module.exports = TaskStore;
