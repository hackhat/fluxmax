var React    = require('react');
var SmartCSS = require('smart-css');
var App      = require('fluxmax').App;
var Task     = React.createFactory(require('./Task'));





var css = new SmartCSS();



css.setClass('root', {
})



css.setClass('button', {
    width        : '320px',
    padding      : '13px',
    border       : '0',
    background   : 'hsl(196, 100%, 50%)',
    color        : 'white',
    fontSize     : '26px',
    outline      : 'none',
    marginBottom : '1px',
    boxSizing    : 'border-box',
    cursor       : 'pointer',
    ':hover': {
    background   : 'hsl(196, 100%, 40%)',
    }
})




var displayName = 'ui.tasks';
var listen = App.listen(displayName, [
    ['batch', 'store.task', '*', '__onChange']
]);





module.exports = React.createClass({



    displayName: displayName,



    componentDidMount: function(){
        listen.start(this.props.context.app, this);
    },



    componentWillUnmount: function(){
        listen.end(this.props.context.app, this);
    },



    __onChange: function(){
        this.forceUpdate();
    },



    __onAddTaskButtonClicked: function(){
        var taskTitle = prompt("Enter task title", Math.random());
        this.props.context.actions[displayName + '.addTask']({
            title: taskTitle
        });
    },



    __onTaskComplete: function(taskId){
        this.props.context.actions[displayName + '.completeTask'](taskId);
    },



    __onTaskUncomplete: function(taskId){
        this.props.context.actions[displayName + '.uncompleteTask'](taskId);
    },



    render: function(){
        return React.DOM.div({
            className: css.getClass('root')
        },
            React.DOM.button({
                className: css.getClass('button'),
                onClick: this.__onAddTaskButtonClicked,
            }, 'Add task'),
            this.props.context.stores.task.getAll().map(function(task){
                return new Task({
                    key          : task._id,
                    task         : task,
                    onComplete   : this.__onTaskComplete,
                    onUncomplete : this.__onTaskUncomplete,
                });
            }.bind(this))
        )
    }



});


