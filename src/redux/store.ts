import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/RootReducer";
import { logger } from "redux-logger";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootSaga from "./sagas/RootSaga";
import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist";
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsDenylist, actionsCreators and other options if needed
  trace: true,
});

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(logger, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);
export { store, persistor };
