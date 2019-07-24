import React from 'react';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
// COMPONENT
import Header from '../../components/Header';
import Main from '../Main';
import Write from '../Write';
import Posts from '../Posts';

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/new-story" component={Write} />
          <Route path="/posts" component={Posts} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
