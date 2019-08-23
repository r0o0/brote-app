import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import { History } from 'history'
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import * as type from '../../types';
// COMPONENT
import Header from '../../components/Header';
import Main from '../Main';
import Write from '../Write';
import Posts from '../Posts';
import Post from '../Post';
import Auth from '../Auth';
import User from '../User';
// UTILS
import { getCookie } from '../../utils/cookie';

interface Props {
  history: History;
  auth: type.Auth;
}

function App(props: Props) {
  const { history, auth } = props;
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const cookieState = getCookie('logged_in');
    if (cookieState === 'yes') {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [auth.login]);

  return (
    <BrowserRouter>
      <ConnectedRouter history={history}>
        <Header isUserLoggedIn={isUserLoggedIn} />
        <Switch>
          <Route exact path="/" render={() => <Main isUserLoggedIn={isUserLoggedIn} />} />
          <Route path="/new-story" component={Write} />
          <Route path="/posts" component={Posts} />
          <Route path="/p/:id" component={Post} />
          <Route path="/@:user" component={User} />
        </Switch>
        <Auth />
      </ConnectedRouter>
    </BrowserRouter>
  );
}

const mapStateToProps = ({ auth }: any) => ({ auth });

export default connect(mapStateToProps)(App);
