import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { reducer, rootSaga } from "./modules";

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  return store;
};
