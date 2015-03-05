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
            onClick: noop
        }
    },



    render: function(){
        return React.DOM.p({
            className : css.getClasses({
                root      : true,
                completed : this.props.task.completed
            }),
            onClick : this.props.onClick.bind(null, this.props.task._id),
        }, 'Task: ' + this.props.task.title)
    }



});


