import reducers from "./slices";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

let middleware = process.env.REACT_APP_ENVIRONMENT === 'production' ? [] : (getDefaultMiddleware) =>
getDefaultMiddleware({ serializableCheck: false }).concat(logger) || null;

const store = configureStore({
  reducer: reducers,
  middleware: middleware
});

export default store;
