var BaseStore = require('./BaseStore');
var App       = require('fluxmax').App;





var TaskStore = function(){
    this.Class = E;
    this.__tasks = [{
        title: 'test',
    }];
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
    ]
}
E.listen = App.addMetaEntity(E.meta);



_.extend(TaskStore.prototype, BaseStore.prototype, {



    getAll: function(){
        return this.__tasks.slice();
    },



    __add: function(task){
        this.__tasks.push(task);
    },



});





module.exports = TaskStore;
