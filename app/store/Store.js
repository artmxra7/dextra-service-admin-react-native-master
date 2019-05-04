import { combineReducers, applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import sagas from "./Sagas";
import carts from "./carts/Reducers";
import orders from "./orders/Reducers";
import jobs from "./jobs/Reducers";
import currentOrder from "./currentOrder/Reducers";
import currentOrderID from "./currentOrderID/Reducers";
import currentJob from "./currentJob/Reducers";
import currentJobID from "./currentJobID/Reducers";

const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({
  carts,
  orders,
  jobs,
  currentOrder,
  currentOrderID,
  currentJob,
  currentJobID
});

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

export default store;
