var React    = require('react');
var SmartCSS = require('smart-css');
var App      = require('fluxmax').App;
var Tasks    = React.createFactory(require('./Tasks'));
var User     = React.createFactory(require('./User'));




var css = new SmartCSS();



css.setClass('root', {
    backgroundImage : 'url(' + require('../iphone.jpg') + ')',
    width           : '366px',
    height          : '778px',
    margin          : '0 auto',
})



css.setClass('app', {
    marginLeft : '25px',
    marginTop  : '126px',
    position   : 'absolute',
    width      : '320px',
    height     : '550px',
    background : 'hsl(0, 100%, 100%)',
    overflowY  : 'overlay',
    overflowX  : 'hidden',
})




var displayName = 'ui.root';
var listen = App.listen(displayName, [
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



    render: function(){
        return React.DOM.div({
            className: css.getClass('root')
        },

            React.DOM.div({
                className: css.getClass('app')
            },
                new User({
                    context: this.props.context
                }),
                new Tasks({
                    context: this.props.context
                })
            )
        )
    }



});


