import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// COMPONENT
import Header from '../../components/Header';
import Main from '../Main';
import Write from '../Write';

function App() {
  console.log('APP');
  
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <h1>BROTE</h1>
    //   </header>
    // </div>
    <BrowserRouter>
      <Header />
      <Route path="/" exact component={Main} />
      <Route path="/new-story" component={Write} />
    </BrowserRouter>
  );
}

export default App;
