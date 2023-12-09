import { createStore, applyMiddleware } from 'redux'
import * as thunk from 'redux-thunk';
import RootReducer from '../reducers/index'

console.log('nigger',thunk);

const middleware = applyMiddleware(thunk.thunk);
console.log(typeof(middleware));
const store = createStore(
    RootReducer,
    middleware
);

export default store;