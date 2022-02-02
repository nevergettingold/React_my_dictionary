import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import vocab from "./modules/vocab";

const middlewares = [thunk];
const rootReducer = combineReducers({ vocab }); //
const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, enhancer);

export default store;
