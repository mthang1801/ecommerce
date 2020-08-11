import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./root-reducer";
import logger from "redux-logger";
const middleware = [thunk];

if (process.env.NODE_ENV !== "production") {
  middleware.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middleware));
