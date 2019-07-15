import React from 'react';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
// COMPONENT
import Header from '../../components/Header';
import Main from '../Main';
import Write from '../Write';

function App() {
  console.log('APP');
  
  return (
    <BrowserRouter>
      <Header />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/new-story" component={Write} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
