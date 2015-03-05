var FluxmaxStoreMixin = require('fluxmax').StoreMixin;
var EventEmitter      = require('event-emitter');





var BaseStore = function(){

};





_.extend(BaseStore.prototype, EventEmitter.prototype, FluxmaxStoreMixin, {

});





module.exports = BaseStore;
