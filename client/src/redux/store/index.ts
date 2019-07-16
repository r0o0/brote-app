// store index
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import reducers, { RootState } from '../reducers';
import * as actions from "../actions";
import epics from '../epics';
import { ActionType } from "typesafe-actions";

type Action = ActionType<typeof actions>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
  }
}

const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();

const composeEnhancers = (
  window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

const middlewares = [
  epicMiddleware,
];

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
);

epicMiddleware.run(epics);

const store = createStore(
  reducers,
  enhancer,
);

export default store;
