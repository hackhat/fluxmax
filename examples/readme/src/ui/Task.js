var React    = require('react');
var SmartCSS = require('smart-css');





var css = new SmartCSS();



css.setClass('root', {
    maxWidth     : '320px',
    lineHeight   : '25px',
    cursor       : 'pointer',
    padding      : '7px 15px 5px 15px',
    borderBottom : '1px solid hsl(139, 56%, 90%)',
    boxSizing    : 'border-box',
    fontFamily   : 'sans-serif',
    transition   : 'all 0.2s',
    color        : 'hsl(0, 0%, 20%)',
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



css.setClass('warning', {
    transition     : 'all 0.2s',
    color          : 'hsl(139, 56%, 75%)',
    borderTop      : '1px solid hsl(139, 56%, 75%)',
    display        : 'inline-block',
    width          : 'calc(100% - 0px)',
    paddingTop     : '5px',
    marginTop      : '5px',
    fontSize       : '12px',
})
css.setClass('warningHover', {
    color          : 'hsl(139, 56%, 55%)',
    borderTopColor : 'hsl(139, 56%, 55%)',
})



css.setClass('warningCompleted', {
    transition     : 'all 0.2s',
    color          : 'hsl(139, 100%, 80%)',
    borderTopColor : 'hsl(139, 100%, 80%)',
})
css.setClass('warningCompletedHover', {
    color          : 'hsl(139, 100%, 95%)',
    borderTopColor : 'hsl(139, 100%, 95%)',
})




var displayName = 'ui.task';
var noop = function(){}





module.exports = React.createClass({



    displayName: displayName,



    getInitialState: function(){
        return {
            hover: false
        }
    },



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



    __onMouseOver: function(){
        this.setState({hover: true});
    },



    __onMouseOut: function(){
        this.setState({hover: false});
    },



    render: function(){
        var task = this.props.task;
        return React.DOM.div({
            className : css.getClasses({
                root      : true,
                completed : task.completed
            }),
            onClick     : this.__onClick,
            onMouseOver : this.__onMouseOver,
            onMouseOut  : this.__onMouseOut,
        },
            React.DOM.span({}, task.title),
            React.DOM.br(),
            !task.completed && !task.manual ? React.DOM.span({
                className: css.getClasses({
                    warning      : true,
                    warningHover : this.state.hover,
                }),
            }, 'Automatically completed at: ' + task.minPoints + ' points.') : void 0,
            task.completed ? React.DOM.span({
                className: css.getClasses({
                    warning               : true,
                    warningCompleted      : true,
                    warningCompletedHover : this.state.hover,
                }),
            }, (task.manual ? 'Manually' : 'Automatically') + ' completed and earned ' + task.pointsOnComplete + ' points!') : void 0
        )
    }



});


