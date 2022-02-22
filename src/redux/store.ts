import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/RootReducer";
import { logger } from "redux-logger";
import rootSaga from "./sagas/RootSaga";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  {},
  applyMiddleware(logger, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
