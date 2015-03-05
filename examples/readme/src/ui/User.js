var React    = require('react');
var SmartCSS = require('smart-css');
var App      = require('fluxmax').App;





var css = new SmartCSS();



css.setClass('root', {
    width        : '320px',
    padding      : '13px',
    border       : '0',
    background   : 'hsl(0, 0%, 7%)',
    color        : 'white',
    fontSize     : '26px',
    outline      : 'none',
    marginBottom : '1px',
    fontFamily   : 'sans-serif',
    boxSizing    : 'border-box',
    cursor       : 'default',
})




var displayName = 'ui.user';
var listen = App.listen(displayName, [
    ['batch', 'store.user', '*', '__onChange']
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
        }, 'User\'s points: ' + this.props.context.stores.user.getPoints())
    }



});


