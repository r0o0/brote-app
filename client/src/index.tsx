import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store, { history } from './redux/store';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './pages/App/App';
import './index.css';
import * as serviceWorker from './serviceWorker';

const fancyLog = () => console.log('%c store 🤯👇🏿👇🏿', 'background: white; color: black; font-weight: bold;', '\n', store.getState());

const httpLink = createHttpLink({
  uri: 'http://localhost:4080'
})

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

const render = () => {
  fancyLog();
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </ApolloProvider>,
    document.getElementById('root')
  );
}

render();
store.subscribe(render);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
