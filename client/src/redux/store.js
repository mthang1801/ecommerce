import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";
import createSagaMiddlewares from "redux-saga";
const sagaMiddlewares = createSagaMiddlewares();

const middleware = [thunk, sagaMiddlewares];
if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middleware));
sagaMiddlewares.run(rootSaga);
