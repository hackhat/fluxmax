var React    = require('react');
var SmartCSS = require('smart-css');
var App      = require('fluxmax').App;





var css = new SmartCSS();



css.setClass('root', {
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
        },
            React.DOM.p({}, 'User\'s points: ' + this.props.context.stores.user.getPoints())
        )
    }



});


