var React     = require('react');
var Fluxmax   = require('fluxmax');
var SmartCSS  = require('smart-css');
var Actions   = require('./Actions');
var RootUI    = require('./ui/index');
var TaskStore = require('./stores/TaskStore');
var UserStore = require('./stores/UserStore');





// Stores and app config.
var App     = Fluxmax.App;
var app     = new App();
var actions = new Actions(app);
var stores = {};
stores.task = new TaskStore({stores: stores});
stores.user = new UserStore({stores: stores});
var instanceEntities = [
    stores.task,
    stores.user,
];
app.addEntities(instanceEntities);
// Mounts stores into the app.
_.forEach(stores, function(store){
    store.mount(app);
})


// App's data.
var data = {
    context: {
        app     : app,
        stores  : stores,
        actions : actions,
    }
}



// React render.
React.render(React.createElement(RootUI, data), document.getElementById('root'), function(){
    console.log('React root UI has been added to DOM.')
});



// Styles.
SmartCSS.injectStyles();




// Debug app
App.checkDependencies(); // On the static App.
var requestAnimationFrame = require('requestanimationframe');
var scheduleNextRAF = function(){
    requestAnimationFrame(function(){
        app.emitBatchChanges(); // On the instance app.
        scheduleNextRAF();
    })
}
scheduleNextRAF();
