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

```javascript
var Fluxmax = require('fluxmax');
var fluxmax = new Fluxmax.App();
fluxmax.addEntities(instanceEntities);
```

### Create a store

```javascript
var FluxmaxStoreMixin = require('Fluxmax').StoreMixin;
var BaseStore = function(){};
_.extend(BaseStore.prototype, EventEmitter.prototype, FluxmaxStoreMixin, {});
```
