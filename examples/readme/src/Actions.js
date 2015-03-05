var _   = require('lodash');
var App = require('fluxmax').App;





var Actions = function(app){
    this.__app = app;
};





var E = Actions;
E.meta = {
    id: 'actions',

    changeTypes: [
        'ui.tasks.addTask',
        'ui.tasks.completeTask',
        'ui.tasks.uncompleteTask',
    ],

    listeners: [
    ]
}
E.listen = App.addMetaEntity(E.meta);





E.meta.changeTypes.forEach(function(changeType){
    Actions.prototype[changeType] =  function(data){
        this.__app.injectChange(E.meta.id, changeType, data)
    }
})





_.extend(Actions.prototype, {



});




module.exports = Actions;
