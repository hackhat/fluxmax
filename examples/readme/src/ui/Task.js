var React    = require('react');
var SmartCSS = require('smart-css');





var css = new SmartCSS();



css.setClass('root', {
})



css.setClass('completed', {
    background: 'green'
})




var displayName = 'ui.task';
var noop = function(){}





module.exports = React.createClass({



    displayName: displayName,



    getDefaultProps: function(){
        return {
            onComplete   : noop,
            onUncomplete : noop,
        }
    },



    __onClick: function(){
        var task = this.props.task;
        if(task.completed){
            this.props.onUncomplete(task._id);
        }else{
            this.props.onComplete(task._id);
        }
    },



    render: function(){
        return React.DOM.p({
            className : css.getClasses({
                root      : true,
                completed : this.props.task.completed
            }),
            onClick: this.__onClick
        }, 'Task: ' + this.props.task.title)
    }



});


