// store index
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import reducers from '../reducers';
import epics from '../epics';

export const history = createBrowserHistory();

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = (
  window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

const middlewares = [
  epicMiddleware,
  routerMiddleware(history),
];

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
);

const store = createStore(
  reducers(history),
  enhancer,
);

epicMiddleware.run(epics);
export default store;
