var React    = require('react');
var SmartCSS = require('smart-css');
var App      = require('fluxmax').App;
var Task     = require('./Task');





var css = new SmartCSS();



css.setClass('root', {
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



    __onTaskClick: function(taskId){
        this.props.context.actions[displayName + '.completeTask'](taskId);
    },



    render: function(){
        return React.DOM.div({
            className: css.getClass('root')
        },
            React.DOM.button({
                onClick: this.__onAddTaskButtonClicked,
            }, 'Add random task'),
            this.props.context.stores.task.getAll().map(function(task){
                return new Task({
                    task    : task,
                    onClick : this.__onTaskClick,
                });
            }.bind(this))
        )
    }



});


