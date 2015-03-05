var React    = require('react');
var SmartCSS = require('smart-css');
var App      = require('fluxmax').App;
var Task     = React.createFactory(require('./Task'));





var css = new SmartCSS();



css.setClass('root', {
})



css.setClass('button', {
    width        : '320px',
    padding      : '13px',
    border       : '0',
    background   : 'hsl(196, 100%, 50%)',
    color        : 'white',
    fontSize     : '26px',
    outline      : 'none',
    marginBottom : '1px',
    boxSizing    : 'border-box',
    cursor       : 'pointer',
    transition   : 'all 0.2s',
    ':hover': {
    background   : 'hsl(196, 100%, 40%)',
    }
})




var displayName = 'ui.tasks';
var listen = App.listen(displayName, [
    ['batch', 'store.task', '*', '__onChange']
]);



// From: http://www.forbes.com/sites/kevinkruse/2013/05/28/inspirational-quotes/
var tasks = [
    'Life is about making an impact, not making an income. –Kevin Kruse'
    ,'Whatever the mind of man can conceive and believe, it can achieve. –Napoleon Hill'
    ,'Strive not to be a success, but rather to be of value. –Albert Einstein'
    ,'Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.  –Robert Frost'
    ,'I attribute my success to this: I never gave or took any excuse. –Florence Nightingale'
    ,'You miss 100% of the shots you don’t take. –Wayne Gretzky'
    ,'I’ve missed more than 9000 shots in my career. I’ve lost almost 300 games. 26 times I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life. And that is why I succeed. –Michael Jordan'
    ,'The most difficult thing is the decision to act, the rest is merely tenacity. –Amelia Earhart'
    ,'Every strike brings me closer to the next home run. –Babe Ruth'
    ,'Definiteness of purpose is the starting point of all achievement. –W. Clement Stone'
    ,'Life isn’t about getting and having, it’s about giving and being. –Kevin Kruse'
    ,'Life is what happens to you while you’re busy making other plans. –John Lennon'
    ,'We become what we think about. –Earl Nightingale'
    ,'Twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do, so throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails.  Explore, Dream, Discover. –Mark Twain'
    ,'Life is 10% what happens to me and 90% of how I react to it. –Charles Swindoll'
    ,'The most common way people give up their power is by thinking they don’t have any. –Alice Walker'
]




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
        var taskTitle = _.shuffle(tasks)[0]; //prompt("Enter task title", _.shuffle(tasks)[0]);
        var currentPoints = this.props.context.stores.user.getPoints();
        var taskAfterPoints = parseInt(prompt("Autocomplete task at X points", currentPoints + 2));
        this.props.context.actions[displayName + '.addTask']({
            title            : taskTitle,
            minPoints        : taskAfterPoints,
            pointsOnComplete : Math.round(Math.random() * 10),
        });
    },



    __onTaskComplete: function(taskId){
        this.props.context.actions[displayName + '.completeTask'](taskId);
    },



    __onTaskUncomplete: function(taskId){
        this.props.context.actions[displayName + '.uncompleteTask'](taskId);
    },



    render: function(){
        return React.DOM.div({
            className: css.getClass('root')
        },
            React.DOM.button({
                className: css.getClass('button'),
                onClick: this.__onAddTaskButtonClicked,
            }, 'Add task'),
            this.props.context.stores.task.getAll().map(function(task){
                return new Task({
                    key          : task._id,
                    task         : task,
                    onComplete   : this.__onTaskComplete,
                    onUncomplete : this.__onTaskUncomplete,
                });
            }.bind(this))
        )
    }



});


