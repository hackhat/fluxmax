var React    = require('react');
var SmartCSS = require('smart-css');
var App      = require('fluxmax').App;





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



    __onAddRandomTaskButtonClicked: function(){
        this.props.context.actions[displayName + '.addTask']({
            title: Math.random()
        });
    },



    render: function(){
        return React.DOM.div({
            className: css.getClass('root')
        },
            React.DOM.button({
                onClick: this.__onAddRandomTaskButtonClicked,
            }, 'Add random task'),
            this.props.context.stores.task.getAll().map(function(task){
                return React.DOM.p({}, task.title)
            })
        )
    }



});


