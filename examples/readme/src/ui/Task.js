var React    = require('react');
var SmartCSS = require('smart-css');





var css = new SmartCSS();



css.setClass('root', {
    maxWidth     : '320px',
    lineHeight   : '35px',
    cursor       : 'pointer',
    padding      : '20px',
    borderBottom : '1px solid hsl(139, 56%, 90%)',
    boxSizing    : 'border-box',
    fontFamily   : 'sans-serif',
    ':hover': {
        background: 'hsl(139, 56%, 90%)',
    }
})



css.setClass('completed', {
    background   : 'hsl(139, 56%, 50%)',
    color        : 'hsl(0, 100%, 100%)',
    borderBottom : '1px solid hsl(0, 100%, 100%)',
    ':hover': {
        background: 'hsl(139, 56%, 60%)'
    }
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
        return React.DOM.div({
            className : css.getClasses({
                root      : true,
                completed : this.props.task.completed
            }),
            onClick: this.__onClick
        }, 'Task: ' + this.props.task.title)
    }



});


