import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import workReducer from "./store/reducers/workReducer";
import userReducer from "./store/reducers/userReducer";
import workerReducer from "./store/reducers/workersReducer";
import taskReducer from "./store/reducers/taskReducer";
import reportReducer from "./store/reducers/reportReducer";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import {
  watchAuth,
  watchWork,
  watchJob,
  watchWorkers,
  watchTasks,
  watchReports,
  watchUser,
} from "./store/sagas/index";
const rootReducer = combineReducers({
  auth: userReducer,
  works: workReducer,
  jobWorkers: workerReducer,
  tasks: taskReducer,
  reports: reportReducer,
});
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchWork);
sagaMiddleware.run(watchJob);
sagaMiddleware.run(watchWorkers);
sagaMiddleware.run(watchTasks);
sagaMiddleware.run(watchReports);
sagaMiddleware.run(watchUser);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
