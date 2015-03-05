var React    = require('react');
var Fluxmax  = require('fluxmax');
var SmartCSS = require('smart-css');
var Actions  = require('./Actions');





// Stores and app config.
var App     = Fluxmax.App;
var app     = new App();
var actions = new Actions(app);

var TaskStore = require('./stores/TaskStore');
var UserStore = require('./stores/UserStore');
var stores = {
    task : new TaskStore(),
    user : new UserStore(),
}
var instanceEntities = [
    stores.task,
    stores.user,
];
app.addEntities(instanceEntities);



// App's data.
var data = {
    context: {
        app     : app,
        stores  : stores,
        actions : actions,
    }
}



// React render.
var RootUI = require('./ui/index');
React.renderComponent(new RootUI(data), document.getElementById('root'), function(){
    console.log('React root UI has been added to DOM.')
});



// Styles.
SmartCSS.injectStyles();




// Debug app
App.checkDependencies();
var requestAnimationFrame = require('requestanimationframe');
var scheduleNextRAF = function(){
    requestAnimationFrame(function(){
        data.context.app.emitBatchChanges();
        scheduleNextRAF();
    })
}
scheduleNextRAF();
