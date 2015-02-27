var _ = require('lodash');





/**
 * @class core.ChangeTypes
 */
var ChangeTypes = function(changeTypes){
    // If you provide an array create an object from the array.
    if(_.isArray(changeTypes)){
        this.__changeTypes = {}
        changeTypes.forEach(function(changeType){
            this.__changeTypes[changeType] = true;
        }.bind(this))
    }else{
        this.__changeTypes = changeTypes;
    }
};





_.extend(ChangeTypes.prototype, {



    get: function(type){
        if(!this.exists(type)){
            throw new Error('Change "' + type + '" does not exist.')
        }
        return type;
    },



    validateData: function(type, data){
        var schema = this.__getSchema(type);
        if(schema === true){
            return {data: 'NO_SCHEMA'}
        }else if(schema === void 0){
            return {data: 'NO_TYPE_DEFINED'}
        }
        var validator = new Validator(schema);
        return {data: validator.check(data)};
    },



    __getSchema: function(type){
        return this.__changeTypes[type];
    },



    exists: function(type){
        if(type === '*') return true;
        return !!this.__changeTypes[type];
    },



    getAll: function(){
        return _.keys(this.__changeTypes);
    },



});




module.exports = ChangeTypes;
