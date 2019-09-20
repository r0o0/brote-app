import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store, { history } from './redux/store';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './pages/App/App';
import gql from 'graphql-tag';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { onError } from "apollo-link-error";
import { shouldInclude } from 'apollo-utilities';
import console from 'dev-console.macro';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      )
    });

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const fancyLog = () => console.log('%c store 🤯👇🏿👇🏿', 'background: white; color: black; font-weight: bold;', '\n', store.getState());

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SERVER_ENDPOINT,
  headers: {
    "Access-Control-Allow-Origin": process.env.REACT_APP_SERVER_ENDPOINT,
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
    'Access-Control-Allow-Headers': 'application/json',
    "Access-Control-Allow-Credentials" : true
  },
  credentials: process.env.REACT_APP_CREDENTIALS,
})

const cache = new InMemoryCache();

export const client = new ApolloClient({
  // link: errorLink.concat(httpLink),
  link: httpLink,
  cache,
})

const render = () => {
  // fancyLog();
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </ApolloProvider>,
    document.getElementById('root')
  );
}

client.defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  },
};

// console.log('cache', client.cache);

render();
store.subscribe(render);

function onUpdateHandler(registration: any) {
  // Make sure that any new version of a service worker will take over the page
  // and become activated immediately.
  const waitingServiceWorker = registration.waiting;
  if (waitingServiceWorker) {
    waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
  }

  const link = document.createElement("a");
  link.classList.add("update-notification");
  link.setAttribute("href", "#");
  link.innerHTML = "Update is available. Click here to install.";

  link.addEventListener("click", e => {
    e.preventDefault();
    window.location.reload();
  });

  (document.querySelector('body') as HTMLBodyElement).appendChild<HTMLAnchorElement>(link);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register({
  skipWaiting: true,
  onUpdate: onUpdateHandler
});
