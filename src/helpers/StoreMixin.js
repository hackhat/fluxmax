module.exports = {



    mount: function(app){
        if(!this.Class) return console.log('This store is missing Class.');
        this.Class.listen.start(app, this);
    },



    getEntityId: function(){
        if(!this.Class){
            return console.log('This store doesnt have this.Class');
        }
        return this.Class.meta.id;
    },




    getChangeTypes: function(){
        if(!this.Class){
            return console.log('This store doesnt have this.Class');
        }
        return this.Class.meta.changeTypes;
    },



    emitChange: function(type, data){
        this.emit('change', {
            type: type,
            data: data
        });
    },


}
