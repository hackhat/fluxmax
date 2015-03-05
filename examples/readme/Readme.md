# Readme example

This is a simple example about Fluxmax and how to use it.



## Stores

To take full advantage of this library we need to use multiple stores which depends on themselves.

In this example we will use these stores:

 - User;
 - Task;

When a new task is added the user gain 1 point, when is done gains 5 points.


### Task store

The task store dispatches the events `added` and `done`. All the events will be dispatched
from the store, which has an entity id equal to `store.task`.


### User store

The user store listens to the events `added` and `done` from the entity `store.task`.
This store will also dispatch the event `pointsChanged`.



## Views

There are 2 views, one which contains the user's points and another which contains the tasks.


### User view

The user view will listen to the events `pointsChanged` on the entity `store.user`.


### Tasks view

The tasks view will listen to the events `added` and `done` on the entity `store.task`.
