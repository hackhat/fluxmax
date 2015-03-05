var React    = require('react');
var Fluxmax  = require('fluxmax');
var SmartCSS = require('smart-css');
var app      = new Fluxmax.App();
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
var data = {
    context: {
        app    : app,
        stores : stores,
    }
}
var RootUI = require('./ui/index');
React.renderComponent(new RootUI(data), document.getElementById('root'), function(){
    console.log('React root UI has been added to DOM.')
});
SmartCSS.injectStyles();

