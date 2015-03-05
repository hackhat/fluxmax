var React    = require('react');
var SmartCSS = require('smart-css');





var css = new SmartCSS();



css.setClass('root', {
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
            className : css.getClass('root'),
            onClick   : this.props.onClick,
        }, 'Task: ' + this.props.task.title)
    }



});


