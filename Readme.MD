![fluxmax](./docs/repo-header.jpg)

2 phase events: update stores then views. 1 way flow. Static event deps checker.

**Quick features:**

 - Update stores properly and naturally;
 - 1 way flow like flux by Facebook;
 - Static event deps checker and output;




## Install

    npm install fluxmax --save-dev



## API

Check the **[full API here](https://cdn.rawgit.com/hackhat/fluxmax/v0.0.1/docs/jsduck/index.html)**.



## Rationale


### Introduction

There are 2 main concepts to understand:

 - 1st phase: each;
 - 2nd phase: batch;

 The first phase is called `each` (because dispatches on `each` change) and the listeners receives the event as soon as it's dispatched. The second phase is called `batch` (because dispatches the events on `batch`) and the listeners receives the event only when the Fluxmax.emitBatchChanges method is called.



## How to use

You should use a module loader such as webpack or browserify to use it properly.

```javascript
var Fluxmax = require('fluxmax');
var fluxmax = new Fluxmax.App();
fluxmax.addEntities(instanceEntities);
```


### Create a store

First we need to create a base store to inherit from in the implementation/real stores:

```javascript
var FluxmaxStoreMixin = require('Fluxmax').StoreMixin;
var BaseStore = function(){};
_.extend(BaseStore.prototype, EventEmitter.prototype, FluxmaxStoreMixin, {});
```

Then we need to create the real store:

```javascript
var BaseStore = require('BaseStore');
var CarStore = function(){
    this.__cars = [];
};
var E = CarStore; // "E" from "Entity". 
E.meta = {
    // Unique id of this entity.
    id: 'store.car',
    // What events this entity dispatches.
    changeTypes: [
        'add',
    ],
    // To what events this entity listens to.
    listeners: [
    ]
}
E.listen = App.addMetaEntity(E.meta);
_.extend(CarStore, BaseStore, {}); // Static methods inheritance
_.extend(CarStore.prototype, BaseStore.prototype, {
    add: function(car){
        this.__cars.push(car);
        // Special method inherited from FluxmaxStoreMixin.
        // This will dispatch an "add" event from the entity
        // "store.car" and contains the payload `car`.
        this.emitChange('add', car);
    }
}); // Instance methods inheritance
```
