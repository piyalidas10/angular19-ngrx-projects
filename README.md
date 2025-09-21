# Angular 19 : NGRX
Chrome Extension : Redux DevTools & Angular DevTools

Store : The store holds the application state. It is immutable, which means it cannot get changed directly. We do not change the state. We use reducers instead. That will process actions that change the state. But we do not change the state directly. That's very, very important because in Nrw we use a one way data flow.

Actions : Those are events that modify the state inside of the store.

Reducers : Functions that take those actions and modify the state based on the action type. Basically means that reducers are processing the actions and an action. For example, could be add something to the cart or remove something from the cart, process the checkout load, some products from the database, successfully loaded, products from the database or I received a failure while loading products from the database. All of those could be actions which are getting processed by a reducer.

Effects : Handle asynchronous operations(like fetching data from a server) and then trigger new actions like (I have successfully loaded products from the server / I faced a failure or an error while I tried loading).

## NGRX use one way data flow

Actions -> Reducers -> Update states -> Selectors share updates

1. Actions are getting processed by reducers as a reducer.
2. As a result, Reducers update the state and then the components are receiving those updates on the state. So the data that got changed by the selectors they are subscribed to. 
3. The updated state is automatically passed to the components via selectors. the components are subscribed to the selectors they are interested in. So let's say we have a component that displays products. Then we would subscribe this component to a selector which shares the information of all the products.

So as you can see, this is one way just goes from the left to the right. It goes from actions reducers, update state to the selectors.


## Now let's assume that we want to show products inside of that component.
![ngrx](img/state-management-lifecycle.png)

1. So we would dispatch an action. It could be load all products.
2. Therefore we would start an effect right here. And that effect would call the service to load all the products and as a result, then start a new action
3. And that effect would call the service to load all the products and as a result, then start a new action which is like I have successfully loaded all the products.
4. Those actions will then get processed by the reducer. Usually you want to create one reducer per entity. So if we would have users, for example, so for authorization and we would have our products, then you would usually have one reducer for the authorization and you would have one reducer for the products.
5. Once the reducer processed the action, the state inside of the store got changed. 
6. the changes are shared via the selectors. And if a component is interested in a specific change, it will subscribe to the well related selector.
