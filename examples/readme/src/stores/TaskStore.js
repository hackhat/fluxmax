var BaseStore = require('./BaseStore');
var App       = require('fluxmax').App;
var _         = require('lodash');





var TaskStore = function(options){
    options = _.extend({
        stores: void 0,
    }, options);
    this.__stores = options.stores;
    BaseStore.apply(this, arguments);
    this.Class = TaskStore;
    this.__tasks = [];
    this.__taskId = 0;
};





var E = TaskStore; // "E" from "Entity".
E.meta = {
    // Unique id of this entity.
    id: 'store.task',
    // What events this entity dispatches.
    changeTypes: [
        'added',
        'completed',
        'uncompleted',
    ],
    // To what events this entity listens to.
    listeners: [
        ['each', 'actions', 'ui.tasks.addTask', '__onUITaskAdd'],
        ['each', 'actions', 'ui.tasks.completeTask', '__onUITaskComplete'],
        ['each', 'actions', 'ui.tasks.uncompleteTask', '__onUITaskUncomplete'],
        ['each', 'store.user', 'pointsChanged', '__onUserPointsChanged'],
    ]
}
E.listen = App.addMetaEntity(E.meta);





_.extend(TaskStore.prototype, BaseStore.prototype, {



    getAll: function(){
        return this.__tasks.slice();
    },



    getTaskById: function(id){
        var task;
        this.__tasks.forEach(function(_task){
            if(_task._id === id) task = _task;
        })
        return task;
    },



    __onUserPointsChanged: function(){
        this.__refreshAutoTasks();
    },



    __refreshAutoTasks: function(){
        var points = this.__stores.user.getPoints();
        this.__tasks.forEach(function(task){
            // If has been manually complete or uncompleted then don't change.
            if(task.manual) return;
            if(task.completed) return;
            if(task.minPoints <= points){
                task.completed = true;
                this.emitChange('completed', task);
            }
        }.bind(this))
    },



    __onUITaskComplete: function(taskId){
        var task = this.getTaskById(taskId);
        if(task.completed) return;
        task.manual = true;
        task.completed = true;
        this.emitChange('completed', task);
    },



    __onUITaskUncomplete: function(taskId){
        var task = this.getTaskById(taskId);
        if(!task.completed) return;
        task.manual = true;
        task.completed = false;
        this.emitChange('uncompleted', task);
    },



    __onUITaskAdd: function(task){
        this.__add(task);
    },



    __add: function(task){
        task._id = this.__taskId++;
        task.completed = false;
        this.__tasks.push(task);
        this.emitChange('added', task);
    },



});





module.exports = TaskStore;
