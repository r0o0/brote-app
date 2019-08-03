import React from 'react';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import { History } from 'history'
import { ConnectedRouter } from 'connected-react-router';
// COMPONENT
import Header from '../../components/Header';
import Main from '../Main';
import Write from '../Write';
import Posts from '../Posts';
import Post from '../Post';
import Login from '../Login';

interface Props {
  history: History
}

function App({ history }: Props) {
  console.log('history in APP', history);
  return (
    <BrowserRouter>
      <ConnectedRouter history={history}>
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/new-story" component={Write} />
          <Route path="/posts" component={Posts} />
          <Route path="/p/:id" component={Post} />
        </Switch>
        <Login />
      </ConnectedRouter>
    </BrowserRouter>
  );
}

export default App;
